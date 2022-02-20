import { Event } from "../../managed/database";
import { EventFrog } from "./eventfrog";

export class Tickets {
    static async findTickets(event: Event, link: string) {
        if (!link) {
            return;
        }

        if (link.includes('://eventfrog.ch/')) {
            await new EventFrog().findTicket(event, link);
        }
    }
}