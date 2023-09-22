import { Provider } from "../provider";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { Event } from "../managed/database";
import { Tickets } from "../tickets/parser";

export default class AmbossRampeProvider extends Provider {
	name = 'amboss-rampe';

	async fetch() {
		const events = [];

		let page = 1;
		let sources;

		while ((sources = await fetch(`https://ambossrampe.ch/wp-json/wp/v2/mec-events?per_page=100&page=${page}`).then(response => response.json())).length) {
			for (let source of sources) {
				const event = new Event();
				event.hash = `${source.id}`;
				event.date = new Date(source.date);
				event.link = source.link;
				event.name = source.yoast_head_json.og_title;
				event.imageUrl = source.yoast_head_json.og_image[0]?.url;
	
				events.push(event);
			}

			page++;
		}

		return events;
	}
}