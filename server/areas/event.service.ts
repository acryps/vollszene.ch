import { Service } from "vlserver";
import { DbContext } from "../managed/database";
import { EventViewModel } from "./event.view";
import { HostViewModel } from "./host.view";

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

    async getHosts() {
        return HostViewModel.from(
            await this.db.host
                .orderByAscending(host => host.name)
        )
    }
}