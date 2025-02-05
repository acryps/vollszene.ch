import { Browser, launch } from "puppeteer-core";
import { Event } from '../managed/database';
import { createHash } from "crypto";
import { writeFileSync } from "fs";
import { join } from "path";

export class Downloader {
	private static browser: Browser;

	constructor(
		private source: string
	) {}

	private async load() {
		if (!Downloader.browser) {
			Downloader.browser = await launch({
				executablePath: process.env.BROWSER_APPLICATION_PATH,
				args: ['--no-sandbox', '--disable-setuid-sandbox']
			});
		}

		// create new tab
		const page = await Downloader.browser.newPage();

		// pretend not to be a bot :)
		await page.evaluateOnNewDocument(() => {
			Object.defineProperty(navigator, 'webdriver', {
				get: () => false
			});
		});

		await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

		await page.setExtraHTTPHeaders({
			'Accept-Language': 'en-US,en;q=0.9'
		});

		// load page
		await page.goto(this.source);

		// wait for no changes on the page
		await new Promise<void>((done, reject) => {
			// timeout
			const timer = setTimeout(() => reject(), 30 * 1000);

			// wait for initial load
			setTimeout(() => {
				let content: string;

				const waiter = setInterval(async () => {
					const updated = await page.evaluate(() => document.body.innerHTML);

					if (updated == content) {
						clearTimeout(timer);
						clearInterval(waiter);

						done();
					} else {
						content = updated;
					}
				}, 250);
			}, 1000);
		});

		return page;
	}

	async downloadPageText() {
		console.log(`[downloader] extracting html from ${this.source}`);

		const page = await this.load();

		let body = await page.evaluate(() => {
			// create a copy of document to prevent javascript from inserting elements while we clean up the page
			const parser = new DOMParser();
			const copy = parser.parseFromString(document.documentElement.outerHTML, 'text/html');

			// remove unused elements
			// required to fit into context
			for (let query of [
				'svg',
				'script',
				'style',
				'img',
				'link'
			]) {
				for (let element of copy.querySelectorAll(query)) {
					element.remove();
				}
			}

			return copy.body.outerHTML;
		});

		page.close();

		while (body.match(/[\n\s]{2}/)) {
			body = body.replace(/[\n\s]+/g, ' ');
		}

		writeFileSync(join('.grabs', `${this.source.toLowerCase().replace(/[^0-9a-z]+/g, '_')}.html`), body);

		return body;
	}

	async grabRaw(grabber: string) {
		console.log(`[downloader] grabbing ${this.source}`);

		const page = await this.load();

		const sourceEvents = await page.evaluate(`(()=>{${grabber}})()`);

		page.close();

		return sourceEvents;
	}

	async grab(grabber: string, dateTransformer: string) {
		try {
			const sourceEvents = await this.grabRaw(grabber);

			if (!Array.isArray(sourceEvents)) {
				throw new Error('Grabber did not return an array');
			}

			const events: Event[] = [];

			for (let source of sourceEvents) {
				try {
					const event = new Event();

					// required properties
					if (source.name) {
						event.name = `${source.name}`;
					} else {
						throw new Error('Grabber did not return a name for the event');
					}

					if (!source.date) {
						throw new Error('Grabber did not return a date for the event');
					}

					const date = eval(`(() => { ${dateTransformer}; return parseDate(${JSON.stringify(source.date)}) })()`);

					if (date) {
						if (!(date instanceof Date)) {
							throw new Error(`Grabber did not return a valid date for '${source.date}'`);
						}

						event.date = date;

						// use link and date combination
						// this should stay stable, more or less
						event.hash = createHash('sha1').update(`${source.link}${date.toISOString()}`).digest('base64');

						if (events.find(existing => existing.hash == event.hash)) {
							throw new Error('Grabber did not return unique ids for the events');
						}

						// optional values
						event.link = source.link && `${source.link}`;
						event.description = source.description && `${source.description}`;
						event.ticketPrice = source.price && +source.price;
						event.imageUrl = source.image;

						console.log(` >> #${event.hash} '${event.name}'`);

						events.push(event);
					}
				} catch (error) {
					console.warn(`!! ${JSON.stringify(source)}: ${error}`);
				}
			}

			if (events.length == 0) {
				throw new Error('Grabber did not return any valid events');
			}

			return events;
		} catch (error) {
			throw new Error(`Grabbing of '${this.source}' failed: ${error}`);
		}
	}
}
