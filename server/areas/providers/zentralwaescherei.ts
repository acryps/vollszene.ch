import { Provider } from "../provider";
import fetch from "node-fetch";
import { Event } from "../../managed/database";

export default class ZentralWaeschereiProvider extends Provider {
	name = 'zentralwaescherei';

	async fetch() {
		const events = [];

		const locations = {
			'ZW-K': 'Gastrobetrieb',
			'ZW-H': 'Grosse Halle',
			'ZW-B': 'Beschallungsraum',
			'ZW-W': 'Werkbereich'
		};

		const data = await fetch(`https://zentralwaescherei.space/api/events/?lang=de&direction=ascending&from=${Math.floor(+new Date() / 1000)}`).then(res => res.json());

		for (let source of data._embedded.events) {
			const event = new Event();
			event.hash = source.id;
			event.name = source.title;

			for (let location in locations) {
				if (event.name.startsWith(location)) {
					event.name = event.name.replace(`${location}-`, `${locations[location]}: `);
				}
			}

			event.date = new Date(new Date(source.fromDate * 1000).toISOString().split("T")[0]);
			event.link = `https://zentralwaescherei.space/event/${source.id}`;

			events.push(event);
		}

		return events;
	}
}