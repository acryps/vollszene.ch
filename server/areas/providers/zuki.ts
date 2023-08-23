import { Provider } from "../provider";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { Event } from "../../managed/database";


export default class ZukiProvider extends Provider {
	name = 'zuki';

	async fetch() {
		const events = [];

		const html = await fetch('https://www.zukunft.cl/').then(res => res.text());
		const page = new JSDOM(html);

		const eventRoot = page.window.document.querySelector('#eventlistcont div');

		for (let eventElement of eventRoot.querySelectorAll('.elelement')) {
			const event = new Event();

			const dateString = eventElement.querySelector('.eldate').textContent;
			const dateComponents = dateString.split(/\s+/);

			event.date = new Date(Date.UTC(2000 + +dateComponents[3], +dateComponents[2] - 1, +dateComponents[1]));
			event.name = eventElement.querySelector('.long').textContent.replace(dateString, '').trim().replace(/\s+/g, ' ');
			event.link = `https://www.zukunft.cl${eventElement.parentElement.href}`;

			events.push(event);
		}
		
		return events;
	}
}