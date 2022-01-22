import { readdirSync } from "fs";
import { join } from "path";
import { DbContext, Event } from "../managed/database";
import { sha512 } from "js-sha512";

export abstract class Provider {
    abstract name: string;

    abstract fetch(): Promise<Event[]>;

    async dispatch(existingEvents: Event[], db: DbContext) {
        console.log(`fetching '${this.name}'`);

        const host = await db.host.first(host => host.provider == this.name);
        const events = await this.fetch();

        for (let event of events) {
            if (!event.hash) {
                event.hash = Provider.hashEvent(event);
            }

            if (!existingEvents.find(item => item.hash == event.hash)) {
                event.host = host;

                await event.create();

                console.log(`+++ ${this.name}: ${event.name}`);

                existingEvents.push(event);
            }
        }

        console.log(`fetched '${this.name}'`);
    }

    static async update(db: DbContext) {
        const existingEvents = await db.event.toArray();

        for (let provider of this.findProviders()) {
            await provider.dispatch(existingEvents, db);
        }
    }

    static findProviders(): Provider[] {
        const providers = [];

        for (let path of readdirSync(join(__dirname, 'providers'))) {
            if (path[0] != '.' && path.endsWith('.js')) {
                const provider = require(join(__dirname, 'providers', path)).default;

                providers.push(new provider());
            }
        }

        return providers;
    }

    static hashEvent(event: Event) {
        return sha512([event.name, event.date, event.link].join('.'.repeat(0xff)));
    }
}