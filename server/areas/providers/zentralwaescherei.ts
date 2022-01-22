import { Provider } from "../provider";
import fetch from "node-fetch";
import { Event } from "../../managed/database";

export default class ZentralWaeschereiProvider extends Provider {
    name = 'zentralwaescherei';

    async fetch() {
        const events = [];

        const data = await fetch(`https://zentralwaescherei.space/api/events/?lang=de&direction=ascending&from=${Math.floor(+new Date() / 1000)}`).then(res => res.json());

        for (let source of data._embedded.events) {
            const event = new Event();
            event.hash = source.id;
            event.name = source.title;
            event.date = new Date(new Date(source.fromDate * 1000).toISOString().split("T")[0]);
            event.link = `https://zentralwaescherei.space/event/${source.id}`;

            events.push(event);
        }

        return events;
    }
}