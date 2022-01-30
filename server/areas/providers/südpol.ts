import { Event } from "../../managed/database";
import { Provider } from "../provider";
import fetch from "node-fetch";

export default class SüdpolProvider extends Provider {
    name = 'südpol';

    async fetch() {
        const events = [];

        const source = await fetch('https://cms.sudpol.ch/api/suedpol/v1/events').then(res => res.json());

        for (let item of source) {
            const event = new Event();
            event.hash = item.field_event_origin_id;
            event.name = item.title;
            event.imageUrl = item.field_event_image;
            event.date = new Date(item.field_event_doors_datetime.split('T')[0]);
            event.link = item.field_event_origin_link;

            event.ticketLink = item.field_event_ticket_link;
            event.ticketPrice = (item.field_event_price.match(/[0-9]+/) || [])[0];
            event.ticketAvailable = true;

            events.push(event);
        }

        return events;
    }
}