import { Event } from "../../managed/database";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

export class EventFrog {
	async findTicket(event: Event, link: string) {
		event.ticketLink = link;

		const html = await fetch(link).then(res => res.text());
		const page = new JSDOM(html);

		for (let option of page.window.document.querySelectorAll('.ticket-category')) {
			const price = option.querySelector('.ticket-category-price')?.textContent.match(/[0-9]+\.[0-9]+/)[0];
			event.ticketPrice = price;
			
			if (option.querySelector('.ticket-amount').textContent.trim() != 'Ausverkauft') {
				event.ticketAvailable = true;

				return;
			}
		}

		event.ticketAvailable = false;
	}
}