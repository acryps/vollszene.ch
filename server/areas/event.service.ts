import { Service } from "vlserver";
import { DbContext } from "../managed/database";
import { EventViewModel } from "./event.view";

export class EventService extends Service {
    constructor(
        private db: DbContext
    ) {
        super();
    }

    async getEvents() {
        return EventViewModel.from(
            await this.db.event
                .orderByAscending(event => event.date)
                .orderByAscending(event => event.name)
        );
    }
}