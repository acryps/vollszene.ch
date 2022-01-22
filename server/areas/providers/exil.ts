import { Provider } from "../provider";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { Event } from "../../managed/database";


export default class ExilProvider extends Provider {
    name = 'exil';

    async fetch() {
        const events = [];

        const html = await fetch('https://exil.cl/').then(res => res.text());
        const page = new JSDOM(html);

        for (let eventElement of page.window.document.querySelectorAll('.show-detail[data-event]:not(.cancelled')) {
            const event = new Event();

            event.hash = eventElement.attributes['data-event'].value;
            event.name = eventElement.querySelector('.title')?.textContent;

            if (event.name && event.name.toLocaleLowerCase() != 'geschlossene gesellschaft') {
                const dateComponents = eventElement.querySelector('.date').textContent.split(/\s+/);

                event.date = new Date(Date.UTC(2000 + +dateComponents[3], +dateComponents[2] - 1, +dateComponents[1]));
                event.link = `https://exil.cl/programm/detail/${event.hash}`;

                events.push(event);
            }
        }

        return events;
    }
}