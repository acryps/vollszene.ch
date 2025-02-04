import { Importer } from "../importer";
import { DbContext, Host, HostRequest } from "../managed/database";
import { Downloader } from "./downloader";
import { Interpreter } from "./interpreter";

export class HostDeveloper {
	static async developPending(database: DbContext) {
		const requests = await database.hostRequest
			.where(request => request.completed == null)
			.toArray();

		for (let request of requests) {
			new HostDeveloper(database, request).develop();
		}
	}

	constructor(
		private database: DbContext,
		private request: HostRequest
	) {}

	async develop() {
		this.request.attempts++;

		if (this.request.attempts > 20) {
			return;
		}

		await this.request.update();

		try {
			let page = await new Downloader(this.request.address).downloadPageText();

			if (!this.request.grabber) {
				const grabber = await this.generateGrabber(page);

				if (!await this.verifyGrabber()) {
					return await this.develop();
				}

				const events = await new Downloader(this.request.address).grabRaw(grabber) as any[];

				if (!Array.isArray(events) || events.length == 0) {
					return await this.develop();
				}

				this.request.grabber = grabber;
				await this.request.update();
			}

			if (!this.request.grabberDateTransformer) {
				const rawEvents = await new Downloader(this.request.address).grabRaw(this.request.grabber) as any[];
				const dateTransformer = await this.generateDateTransformer(rawEvents.map(event => event.date).filter(event => event));

				const events = await new Downloader(this.request.address).grab(this.request.grabber, dateTransformer);

				for (let event of events) {
					if (!isNaN(+event.date)) {
						this.request.grabberDateTransformer = dateTransformer;
						this.request.completed = new Date();

						await this.request.update();

						const host = new Host();
						host.grabber = this.request.grabber;
						host.grabbingAddress = this.request.address;
						host.grabberDateTransformer = this.request.grabberDateTransformer;
						host.public = true; // for now
						host.name = this.request.name;

						await host.create();

						new Importer(this.database).importHost(host);

						return true;
					}
				}
			}
		} catch (error) {
			console.log(`[developer] failed: ${this.request.name}: ${error}`);

			return await this.develop();
		}
	}

	async generateGrabber(page: string) {
		console.log(`[generator] generating grabber for ${this.request.address}`);

		return await new Interpreter().develop(`
			create javascript scripts that parse the given website, returning a javascript object for each event in the website in the form of { id: string, name: string, date: string, link?: string, description?: string, price?: number }.
			only return the code.
			the scripts runs in an eval on a puppeteer browser.
			the id should be an unique identifier of this event - if none is available, it can also just be the link to the event.
			at the end, use a return statement to return the array of events, do not log it to console.
			do not generate a script which contains any events, generate a parser for this html structure.
			make the script fault tolerant, by just omitting events that it does not understand
		`, page.substring(0, 20000));
	}

	async verifyGrabber() {
		console.log(`[generator] verify grabber for ${this.request.address}`);

		return await new Interpreter().verify(`
			does this code extract data from the contents of a website?
		`);
	}

	async generateDateTransformer(dates: string[]) {
		return await new Interpreter().develop(`
			create a javascript function called parseDate(string) which can parse dates like the ones i provide here into javascript Date objects.
			make the script fault tolerant, by just returning null for the dates that it does not understand.
			only return the function, no explanation comments or examples
		`, ...dates);
	}

	async verifyDateTransformer() {
		console.log(`[generator] verify grabber for ${this.request.address}`);

		return await new Interpreter().verify(`
			does this code convert a date in a string format into a real javascript date?
		`);
	}
}
