import { Provider } from "../provider";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { Event } from "../../managed/database";


export default class HelsinkiProvider extends Provider {
	name = 'helsinki';

	async fetch() {
		const events = [];

		const html = await fetch('https://www.helsinkiklub.ch/').then(res => res.text());
		const page = new JSDOM(html);

		for (let eventElement of page.window.document.querySelectorAll('#program .event')) {
			const event = new Event();

			if (!eventElement.querySelector('.headline.cancelled')) {
				event.hash = eventElement.id.split('_')[1];

				event.name = [
					eventElement.querySelector('.top')?.childNodes[0].textContent,
					eventElement.querySelector('.top .addition')?.textContent || ''
				].join(' ').trim();

				event.link = eventElement.querySelector('a')?.href;
				event.imageUrl = eventElement.querySelector('img')?.src;

				if (event.name && event.link) {
					let petzi = new JSDOM(await fetch(event.link).then(res => res.text()));
					let movedTitle;

					while (movedTitle = petzi.window.document.querySelector('.events__details h3 a')) {
						console.log(`> moved ${event.name}`);

						petzi = new JSDOM(await fetch(`https://www.petzi.ch/${movedTitle.href}`).then(res => res.text()));
					}

					const dateComponents = (petzi.window.document.querySelector('title').textContent.match(/[0-9]{2}\.[0-9]{2}\.[0-9]{4}/) || '.')[0].split('.');

					if (dateComponents.length == 3) {
						event.date = new Date(Date.UTC(+dateComponents[2], +dateComponents[1] - 1, +dateComponents[0]));

						events.push(event);
					}
				}
			}
		}
		
		return events;
	}
}