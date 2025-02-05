import { cpus } from "os";
import { Browser, launch, Page } from "puppeteer-core";

export class BrowserManager {
	private browser: Browser;

	queue: Function[] = [];

	constructor(
		private size: number = Math.ceil(Math.max(1, cpus().length) / 4)
	) {
		this.launch();
	}

	async launch() {
		this.browser = await launch({
			executablePath: process.env.BROWSER_APPLICATION_PATH,
			args: ['--no-sandbox', '--disable-setuid-sandbox']
		});

		this.next();
	}

	async next() {
		const pages = await this.browser.pages();

		const availablePages = this.size - pages.length;
		console.log(availablePages, pages.map(page => page.url()));

		for (let page = 0; page < availablePages; page++) {
			if (this.queue.length) {
				const first = this.queue.shift();
				console.log('handing out page...');

				first(await this.browser.newPage());
			}
		}

		setTimeout(async () => this.next(), 1000);
	}

	async close() {
		await this.browser.close();
	}

	async getPage() {
		return await new Promise<Page>(done => this.queue.push(page => done(page)));
	}
}
