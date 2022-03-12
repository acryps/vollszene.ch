import { Provider } from "../provider";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { Event } from "../../managed/database";


export default class GrosseHalleProvider extends Provider {
    name = 'grosse-halle';

    async fetch() {
        const events = [];

        const html = await fetch('https://www.grossehalle.ch/').then(res => res.text());
        const page = new JSDOM(html);

        for (let eventElement of page.window.document.querySelectorAll('.event')) {
            for (let date of eventElement.getAttribute('data-dates').split(',')) {
                const event = new Event();
                event.hash = date + eventElement.id;

                event.name = eventElement.querySelector('h2').textContent;
                event.link = eventElement.querySelector('a').href;
                event.imageUrl = eventElement.querySelector('img')?.src;

                const dateComponents = date.split('-');
                event.date = new Date(Date.UTC(+dateComponents[0], +dateComponents[1] - 1, +dateComponents[2]));

                events.push(event);
            }
        }

        return events;
    }
}