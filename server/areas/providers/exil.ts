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

        const treshold = new Date();
        treshold.setMonth(treshold.getMonth() - 1);

        for (let article of page.window.document.querySelectorAll('article[id]:not(.cancelled')) {
            const event = new Event();

            const id = article.id.split('-')[1];

            event.hash = id;
            event.name = article.querySelector('h1')?.textContent.trim();

            if (event.name && event.name.toLocaleLowerCase() != 'geschlossene gesellschaft') {
                const dateComponents = article.querySelector('time').attributes['datetime'].value.split(/-|T/g);

                event.date = new Date(Date.UTC(+dateComponents[0], +dateComponents[1] - 1, +dateComponents[2]));
                event.link = `https://exil.cl/programm/detail/${id}`;
                event.imageUrl = article.querySelector('img[data-mfp-src], img[data-src]')?.attributes['data-src']?.value;

                if (event.date > treshold) {
                    events.push(event);
                }
            }
        }

        return events;
    }
}