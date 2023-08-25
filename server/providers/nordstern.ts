import { Event } from "../managed/database";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { Provider } from "../provider";

export default class NordsternProvider extends Provider {
	name = 'nordstern';

	async fetch() {
		const events: Event[] = [];

		const html = await fetch('https://www.nordstern.com/').then(res => res.text());
		const page = new JSDOM(html);

		for (let element of page.window.document.querySelectorAll('.et_pb_section_1 .et_pb_text_inner')) {
			const dateComponents = element.querySelector('p').textContent.split(/\||\s/g);

			const event = new Event();
			event.name = element.querySelector('p strong')?.textContent || [...element.querySelectorAll('strong')].map(element => element.textContent.trim()).filter(s => s).join(', ');
			event.date = new Date(Date.UTC(+dateComponents[3] + 2000, +dateComponents[2] - 1, +dateComponents[1]));

			if (+event.date) {
				event.link = 'https://www.nordstern.com/';

				// resolve bitly links
				const shortenedLink = element.querySelector('a')?.href;

				if (shortenedLink) {
					event.link = await fetch(shortenedLink).then(res => res.url);
				}

				events.push(event);
			}
		}

		return events;
	}
}