import { Provider } from "../provider";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { Event } from "../../managed/database";


export default class SedelProvider extends Provider {
	name = 'sedel';

	async fetch() {
		const events = [];

		const html = await fetch('https://sedel.ch').then(res => res.text());
		const page = new JSDOM(html);

		for (let eventElement of page.window.document.querySelectorAll('.month-list li')) {
			const event = new Event();
			
			const dateComponents = eventElement.querySelector('time').attributes['datetime'].value.split(/-|T/g);
			event.date = new Date(Date.UTC(+dateComponents[0], +dateComponents[1] - 1, +dateComponents[2]));

			const link = eventElement.querySelector('a');

			event.name = link.textContent;
			event.link = `https://sedel.ch${link.href}`;

			if (!event.name.includes('ABGESAGT')) {
				events.push(event);
			}
		}
		
		return events;
	}
}