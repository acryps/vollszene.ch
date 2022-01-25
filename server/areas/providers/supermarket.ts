import { Event } from "../../managed/database";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { Provider } from "../provider";

export default class SupermarketProvider extends Provider {
    name = 'supermarket';

    async fetch() {
        const events: Event[] = [];

        const html = await fetch('https://tickets.supermarket.li/').then(res => res.text());
        const page = new JSDOM(html);

        for (let element of page.window.document.querySelectorAll('.card-shop[data-upox-id]')) {
            const link = `https://tickets.supermarket.li${element.querySelector('a').href}`;

            const event = new Event();
            event.link = link;
            event.hash = element.attributes['data-upox-id'].value;

            const details = new JSDOM(await fetch(event.link).then(res => res.text()));
            const data = JSON.parse(details.window.document.querySelector('script[type="application/ld+json"]').textContent);

            const dateComponents = data.startDate.split(/-|T/g);

            event.name = data.name;
            event.date = new Date(Date.UTC(+dateComponents[0], +dateComponents[1] - 1, dateComponents[2]));

            events.push(event);
        }

        return events;
    }
}