import fetch from "node-fetch";
import { Event } from "../managed/database";
import { Tickets } from "../tickets/parser";

export class FacebookParser {
	static async fetch(pageId: string) {
		const events = [];

		for (let source of await this.fetchPage(pageId)) {
			const event = new Event();
			event.name = source.node.name;
			event.link = `https://www.facebook.com/events/${source.node.id}/`;

			event.ticketLink = source.node.event_buy_ticket_url;
			event.ticketAvailable = true;

			Tickets.findTickets(event, source.node.event_buy_ticket_url);

			const dateComponents = source.node.time_range.start.split(/-|T/g);
			event.date = new Date(Date.UTC(+dateComponents[0], +dateComponents[1] - 1, +dateComponents[2]));

			events.push(event);
		}

		return events;
	}

	private static async fetchPage(pageId: string, cursor?: string, depth = 0) {
		const page = await fetch("https://www.facebook.com/api/graphql/", {
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			referrer: 'https://www.facebook.com/pg/molobarluzern/events/',
			body: [
				'fb_api_caller_class=RelayModern',
				'fb_api_req_friendly_name=PageEventsTabUpcomingEventsCardRendererQuery',
				`variables=${encodeURIComponent(JSON.stringify({
					pageID: pageId,
					count: 9,
					cursor: cursor
				}))}`,
				'doc_id=5182274978466320'
			].join('&')
		}).then(res => res.json()) as any;

		const events = page.data.page.upcoming_events.edges;

		if (page.data.page.upcoming_events.page_info.has_next_page && depth < 5) {
			events.push(...await this.fetchPage(pageId, page.data.page.upcoming_events.page_info.end_cursor, depth + 1))
		}   

		return events;
	}
}