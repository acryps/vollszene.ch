import { Event } from "../managed/database";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { Provider } from "../provider";

export default class FriedasBuexeProvider extends Provider {
	name = 'friedasbuexe'

	async fetch() {
		const events: Event[] = [];

		const html = await fetch('https://friedasbuexe.ch/programm/').then(res => res.text());
		const page = new JSDOM(html);

		for (let element of page.window.document.querySelectorAll('.jet-listing-grid__item[data-post-id]')) {
			const event = new Event();
			event.hash = element.attributes['data-post-id'].value;
			event.name = element.querySelector('h2').textContent.trim();
			event.link = element.querySelector('a')?.href || 'https://friedasbuexe.ch/';

			const dateComponents = element.querySelector('h6').textContent.trim().split(/\.|\s/);

			event.date = new Date(Date.UTC(+dateComponents[2], +dateComponents[1] - 1, +dateComponents[0]));

			events.push(event);
		}

		return events;
	}
}