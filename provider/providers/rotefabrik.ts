import { Event } from "../managed/database";
import { Provider } from "../provider";
import fetch from "node-fetch";

export default class RoteFabrikProvider extends Provider {
	name = 'rotefabrik';

	async fetch() {
		const events = [];

		const source = await fetch('https://kalender.rotefabrik.ch/api/events?&from=22-01-01&to=50-12-31&limit=10').then(res => res.json() as any);

		for (let id in source) {
			for (let item of source[id].rf_event.rf_event_dates) {
				const event = new Event();
				event.hash = item.r_f_event_id;
				event.name = [source[id].rf_event.title, source[id].rf_event.subtitle].filter(s => s).join(': ');
				event.link = `https://rotefabrik.ch/de/programm.html#/events/${source[id].id}`;

				if (source[id].rf_event.files) {
					const image = Object.keys(JSON.parse(source[id].rf_event.files)['main-image'] || {})[0];

					if (image) {
						event.imageUrl = `https://kalender.rotefabrik.ch/thumbs/1200x1200/events/${item.r_f_event_id}/main-image/${image}`;
					}
				}

				const dateComponents = item.date.split(/-|\s/g);
				event.date = new Date(Date.UTC(+dateComponents[0], +dateComponents[1] - 1, dateComponents[2]));
				
				events.push(event);
			}
		}

		return events;
	}
}