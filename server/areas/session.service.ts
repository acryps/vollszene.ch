import { Service } from "vlserver";
import { DbContext, Session } from "../managed/database";

export class SessionService extends Service {
	request;

	constructor(
		private db: DbContext
	) {
		super();
	}

	onrequest(request) {
		this.request = request.req;
	}

	async createSession(key: string, width: number, height: number) {
		const session = new Session();
		session.key = key;
		session.width = width;
		session.height = height;
		session.headers = JSON.stringify(this.request.headers);
		session.ip = this.request.headers['gateway-source-address'] || this.request.connection.remoteAddress;
		session.createdAt = new Date();
		
		await session.create();

		return session.id;
	}
}