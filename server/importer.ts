import { Downloader } from "./host/downloader";
import { DbContext, Host } from "./managed/database";

export class Importer {
	constructor(
		private database: DbContext
	) {}

	async import() {
		const hosts = await this.database.host.where(host => host.public == true).toArray();

		const tasks = [];

		for (let host of hosts) {
			tasks.push(this.importHost(host));
		}

		await Promise.all(tasks);
	}

	async importHost(host: Host) {
		console.log(`[import] importing '${host.name}'`);

		try {
			const events = await new Downloader(host.grabbingAddress).grab(host.grabber, host.grabberDateTransformer);
			const existingEvents = await host.events.toArray();

			for (let event of events) {
				if (!existingEvents.find(existing => existing.hash == event.hash)) {
					event.host = host;

					event.create();
				}
			}

			host.online = true;
			host.updatedAt = new Date();

			console.log(`[import] imported '${host.name}'`);
		} catch (error) {
			console.warn(`[import] host '${host.name}' failed`, error);

			host.online = false;
		}

		await host.update();
	}
}
