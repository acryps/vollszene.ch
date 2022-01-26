export class EventViewModel {
	host: HostViewModel;
	id: string;
	date: Date;
	name: string;
	link: string;
	imageUrl: string;

	private static $build(raw) {
		const item = new EventViewModel();
		item.host = raw.host ? HostViewModel["$build"](raw.host) : null
		item.id = raw.id === null ? null : `${raw.id}`
		item.date = raw.date ? new Date(raw.date) : null
		item.name = raw.name === null ? null : `${raw.name}`
		item.link = raw.link === null ? null : `${raw.link}`
		item.imageUrl = raw.imageUrl === null ? null : `${raw.imageUrl}`
		
		return item;
	}
}

export class HostViewModel {
	location: LocationViewModel;
	id: string;
	name: string;
	online: boolean;
	updatedAt: Date;

	private static $build(raw) {
		const item = new HostViewModel();
		item.location = raw.location ? LocationViewModel["$build"](raw.location) : null
		item.id = raw.id === null ? null : `${raw.id}`
		item.name = raw.name === null ? null : `${raw.name}`
		item.online = !!raw.online
		item.updatedAt = raw.updatedAt ? new Date(raw.updatedAt) : null
		
		return item;
	}
}

export class LocationViewModel {
	id: string;
	name: string;

	private static $build(raw) {
		const item = new LocationViewModel();
		item.id = raw.id === null ? null : `${raw.id}`
		item.name = raw.name === null ? null : `${raw.name}`
		
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
	async getEvents(location: string): Promise<Array<EventViewModel>> {
		const data = new FormData();
		data.append("1tdDpvdTFidDJhMDM5Zjl5dWUxeD01MD", JSON.stringify(location))

		return await fetch(Service.toURL("80YThweDRlbTdtbTs2NTc2OXpyeXx0d3"), {
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