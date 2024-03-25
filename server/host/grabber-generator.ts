import { Downloader } from "./downloader";
import { Interpreter } from "./interpreter";

export class GrabberGenerator {
	constructor(
		private source: string
	) {}
	
	async generate() {
		let page = await new Downloader(this.source).downloadPageText();
		
		console.log(`[generator] generating grabber for ${this.source}`);
		
		return await new Interpreter().develop('create javascript scripts that parse the given website, returning a javascript object for each event in the website in the form of { id: string, name: string, date: string, link?: string, description?: string, price?: number }. only return the code. the scripts runs in an eval on a puppeteer browser. the id should be an unique identifier of this event - if none is available, it can also just be the link to the event. at the end, use a return statement to return the array of events, do not log it to console. do not generate a script which contains any events, generate a parser for this html structure. make the script fault tolerant, by just omitting events that it does not understand', page.substring(0, 20000));
	}
	
	async generateDateTransformer(dates: string[]) {
		return await new Interpreter().develop('create a javascript function called parseDate(string) which can parse dates like the ones i provide here into javascript Date objects. make the script fault tolerant, by just returning null for the dates that it does not understand. only return the function, no explanation comments or examples', ...dates);
	}
}
