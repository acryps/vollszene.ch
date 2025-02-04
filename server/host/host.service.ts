import { Service } from "vlserver";
import { DbContext, Host, HostRequest } from "../managed/database";
import { HostDeveloper } from "./developer";
import { HostRequestViewModel } from "./requiest.view";

export class HostService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async create(name: string, address: string) {
		const request = new HostRequest();
		request.name = name;
		request.address = address;
		request.attempts = 0;
		request.requested = new Date();

		await request.create();

		new HostDeveloper(request).develop();
	}

	async queue() {
		return HostRequestViewModel.from(
			this.database.hostRequest
				.where(request => request.completed == null)
				.orderByAscending(request => request.name)
		)
	}
}
