export class EventViewModel {
	host: HostViewModel;
	id: string;
	date: Date;
	name: string;
	link: string;

	private static $build(raw) {
		const item = new EventViewModel();
		item.host = raw.host ? HostViewModel["$build"](raw.host) : null
		item.id = raw.id === null ? null : `${raw.id}`
		item.date = raw.date ? new Date(raw.date) : null
		item.name = raw.name === null ? null : `${raw.name}`
		item.link = raw.link === null ? null : `${raw.link}`
		
		return item;
	}
}

export class HostViewModel {
	id: string;
	name: string;
	online: boolean;
	updatedAt: Date;

	private static $build(raw) {
		const item = new HostViewModel();
		item.id = raw.id === null ? null : `${raw.id}`
		item.name = raw.name === null ? null : `${raw.name}`
		item.online = !!raw.online
		item.updatedAt = raw.updatedAt ? new Date(raw.updatedAt) : null
		
		return item;
	}
}

export class Service {
	static baseUrl = "";

	static toURL(request) {
		return `${this.baseUrl}${request}`;
	}
}

export class EventService {
	async getEvents(): Promise<Array<EventViewModel>> {
		const data = new FormData();
		

		return await fetch(Service.toURL("g4NnQxcGowazFtano1bWo3MnRkemJ3c2"), {
			method: "post",
			credentials: "include",
			body: data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : EventViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}

	async getHosts(): Promise<Array<HostViewModel>> {
		const data = new FormData();
		

		return await fetch(Service.toURL("VtbnJmYTBkdXliYWE5aWI5NGczOGF5ZW"), {
			method: "post",
			credentials: "include",
			body: data
		}).then(res => res.json()).then(r => {
			if ("data" in r) {
				const d = r.data;

				return d.map(d => d === null ? null : HostViewModel["$build"](d));
			} else if ("aborted" in r) {
				throw new Error("request aborted by server");
			} else if ("error" in r) {
				throw new Error(r.error);
			}
		});
	}
}