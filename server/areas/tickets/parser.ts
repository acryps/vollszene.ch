import { Event } from "../../managed/database";
import { EventFrog } from "./eventfrog";

export class Tickets {
    async findTickets(event: Event, link: string) {
        if (link.includes('://eventfrog.ch/')) {
            await new EventFrog().findTicket(event, link);
        }
    }
}