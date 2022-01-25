import { Event } from "../../managed/database";
import { Provider } from "../provider";
import fetch from "node-fetch";

export default class SüdpolProvider extends Provider {
    name = 'südpol';

    async fetch() {
        const events = [];

        const source = await fetch('https://cms.sudpol.ch/api/acf/v3/events').then(res => res.json());
        
        for (let item of source) {
            if (item.acf.og_enabled || item.acf.seo_enabled) {
                const event = new Event();
                event.hash = item.id;
                event.name = (item.acf.og_title || item.acf.seo_title).replace(/\<\/?[a-z]+\>/g, '');
                event.date = new Date(item.acf.event_date_info[0].event_date * 1000);
                event.link = item.acf.ticket_link || 'https://sudpol.ch';

                events.push(event);
            }
        }

        return events;
    }
}