import { readdirSync } from "fs";
import { join } from "path";
import { DbContext, Event } from "../managed/database";
import { sha512 } from "js-sha512";

export abstract class Provider {
    abstract name: string;

    abstract fetch(): Promise<Event[]>;

    async dispatch(db: DbContext) {
        const host = await db.host.first(host => host.provider == this.name);
        const events = await this.fetch();

        for (let event of events) {
            if (!event.hash) {
                event.hash = Provider.hashEvent(event);
            }

            const existing = await db.event.first(item => item.hash == event.hash);

            if (!existing) {
                event.host = host;

                await event.create();

                console.log(`+++ ${this.name}: ${event.date.toDateString()} ${event.name} [${event.link}]`);
            } else {
                event.id = existing.id;

                if (event.imageUrl != existing.imageUrl) {
                    console.log(`>>> ${this.name}: ${event.date.toDateString()} ${event.name} [${event.link}]`)
                } 

                await event.update();
            }
        }
    }

    static async update(db: DbContext) {
        for (let provider of this.findProviders()) {
            const host = await db.host.first(host => host.provider == provider.name);

            if (host) {
                provider.dispatch(db).then(() => {
                    host.updatedAt = new Date();
                    host.online = true;
                }).catch(error => {
                    host.online = false;
    
                    console.error(`failed '${provider.name}'`, error);
                }).finally(async () => {
                    await host.update();
                });
            } else {
                console.log(`skipped '${provider.name}' - missing host`);
            }
        }

        setTimeout(() => this.update(db), 1000 * 60 * Math.random() * 30 + 30);
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
        return sha512([event.name, event.date.toISOString().split('T')[0], event.link].join('.'.repeat(0xff)));
    }
}