import { Browser, launch } from "puppeteer";
import { Event } from '../managed/database';
import { createHash } from "crypto";

export class Downloader {
	private static browser: Browser;
	
	constructor(
		private source: string
	) {}
	
	private async load() {
		if (!Downloader.browser) {
			Downloader.browser = await launch();
		}
		
		// create new tab
		const page = await Downloader.browser.newPage();
		
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
		const body = await page.evaluate(() => document.body.innerHTML);
		
		page.close();
		
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
				
				console.log(`! ${source.date} ${date}`);
				
				if (date) {
					if (!(date instanceof Date)) {
						throw new Error(`Grabber did not return a valid date for '${source.date}'`);
					}
					
					event.date = date;
					
					if (!source.id) {
						throw new Error('Grabber did not return an id for the event');
					}
					
					event.hash = createHash('sha1').update(`${source.id}${date.toISOString()}`).digest('base64');
					
					if (events.find(existing => existing.hash == event.hash)) {
						throw new Error('Grabber did not return unique ids for the events');
					}
					
					// optional values
					event.link = source.link && `${source.link}`;
					event.description = source.description && `${source.description}`;
					event.ticketPrice = source.price && +source.price;
					
					console.log(` >> #${event.hash} '${event.name}'`);
					
					events.push(event);
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
