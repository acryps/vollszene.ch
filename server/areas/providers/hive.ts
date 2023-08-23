import { Provider } from "../provider";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { Event } from "../../managed/database";

export default class HiveProvider extends Provider {
	name = 'hive';

	async fetch() {
		const events: Event[] = [];

		const now = new Date();
		now.setMonth(now.getMonth() - 1);

		for (let month = 0; month < 5; month++) {
			const source = await fetch('https://www.hiveclub.ch/views/ajax', {
				method: 'post',
				headers: {
					'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				body: `view_name=calendar&view_display_id=block_1&date=${now.getUTCFullYear()}-${(now.getUTCMonth() + 1).toString().padStart(2, '0')}`
			}).then(res => res.json()).then(res => res.find(action => action.command == 'insert').data);
			const page = new JSDOM(source);

			for (let dateElement of page.window.document.querySelectorAll('td[data-date]')) {
				const dateComponents = dateElement.attributes['data-date'].value.split('-');
				const date = new Date(Date.UTC(+dateComponents[0], +dateComponents[1] - 1, +dateComponents[2]))

				for (let link of dateElement.querySelectorAll('a[href]')) {
					const event = new Event();
					event.date = date;
					event.name = link.textContent;
					event.link = `https://hiveclub.ch${link.href}`;

					events.push(event);
				}
			}

			now.setMonth(now.getMonth() + 1);
		}

		return events;
	}
}