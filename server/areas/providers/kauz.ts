import { Provider } from "../provider";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { Event } from "../../managed/database";


export default class KauzProvider extends Provider {
    name = 'kauz';

    async fetch() {
        const events = [];

        const html = await fetch('https://kauzig.ch/').then(res => res.text());
        const page = new JSDOM(html);

        let topDate = new Date(new Date().toDateString());
        topDate.setUTCHours(0);

        for (let eventElement of page.window.document.querySelectorAll('h2 .party_link')) {
            const event = new Event();
            let date;
            
            const dateElement = eventElement.parentElement.previousSibling?.previousSibling;

            // skip events that are today, we should already have them in the list!
            if (dateElement.textContent != 'TONIGHT') {
                date = (+dateElement.textContent.match(/[0-9]+/) || '')[0];

                if (date) {
                    if (topDate.getUTCDate() > date) {
                        topDate.setUTCDate(1);
                        topDate.setUTCMonth(topDate.getUTCMonth() + 1);
                    }
        
                    topDate.setUTCDate(date);

                    event.date = new Date(topDate);
                    event.hash = eventElement.href.match(/[0-9]+/)[0];
                    event.name = eventElement.textContent;
                    event.link = eventElement.href;

                    events.push(event);
                }
            }
        }
        
        return events;
    }
}