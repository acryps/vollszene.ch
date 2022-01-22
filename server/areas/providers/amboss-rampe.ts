import { Provider } from "../provider";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { Event } from "../../managed/database";

export default class AmbossRampeProvider extends Provider {
    name = 'amboss-rampe';

    async fetch() {
        const events = [];

        const html = await fetch('http://www.ambossrampe.ch/calendar-2/').then(res => res.text());
        const page = new JSDOM(html);

        for (let eventElement of page.window.document.querySelectorAll('.ai1ec-event')) {
            const event = new Event();

            
            event.name = (
                eventElement.querySelector('.ai1ec-event-title')?.textContent.trim() || eventElement.querySelector('.ai1ec-event-summary .ai1ec-event-description [style]')?.textContent.trim()
            ).replace(/\s+/g, ' ');
                
            const dateComponents = eventElement.parentElement.previousSibling.previousSibling.href.split('~').pop().split('/')[0].split('-');

            event.date = new Date(Date.UTC(+dateComponents[2], +dateComponents[1] - 1, +dateComponents[0]));
            event.link = eventElement.querySelector('.ai1ec-load-event').href;

            if (!event.name.startsWith('Sonntag ist Ruhetag')) {
                events.push(event);
            }
        }

        return events;
    }
}