import { Provider } from "../provider";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { Event } from "../../managed/database";


export default class DachstockProvider extends Provider {
	name = 'dachstock';

	async fetch() {
		const events = [];

		const html = await fetch('https://www.dachstock.ch/').then(res => res.text());
		const page = new JSDOM(html);

		for (let eventElement of page.window.document.querySelectorAll('.event')) {
			const event = new Event();
			event.hash = eventElement.getAttribute('data-id');
			event.name = eventElement.querySelector('h3').textContent;
			event.link = eventElement.getAttribute('data-url');
			event.imageUrl = eventElement.querySelector('img').src;

			const dateString = eventElement.querySelector('.event-date').textContent;
			const dateComponents = dateString.split(/\.|\s+/);

			event.date = new Date(Date.UTC(+dateComponents[4], +dateComponents[3] - 1, +dateComponents[2]));

			events.push(event);
		}
		
		return events;
	}
}