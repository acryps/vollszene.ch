import { Provider } from "../provider";
import { FacebookParser } from "../parsers/facebook";


export default class KegelbahnProvider extends Provider {
	name = 'kegelbahn';

	async fetch() {
		const events = await FacebookParser.fetch('258739154274392');

		for (let event of events) {
			if (event.ticketLink == 'http://klubkegelbahn.ch/') {
				delete event.ticketLink;
			}
		}

		return events;
	}
}