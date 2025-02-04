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

	async getEvents(page: number) {
		const yesterday = new Date(new Date().toDateString());
		yesterday.setUTCHours(-24);

		const query = this.db.event
			.where(event => event.date.isAfter(yesterday))
			.where(event => event.host.public)
			.page(page, 50);

		return EventViewModel.from(
			query
				.orderByAscending(event => event.date)
				.orderByAscending(event => event.name)
		);
	}

	async getHosts() {
		return HostViewModel.from(
			this.db.host
				.where(host => host.public)
				.orderByAscending(host => host.name)
		)
	}
}
