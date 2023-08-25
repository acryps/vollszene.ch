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

	async getEvents(location: string) {
		const yesterday = new Date(new Date().toDateString());
		yesterday.setUTCHours(-24);

		const query = this.db.event.where(event => event.date.isAfter(yesterday));

		if (location) {
			query.where(event => event.host.locationId == location);
		}
		
		return EventViewModel.from(
			await query
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