export class EventViewModel {
    host: HostViewModel;
	id: string;
	date: Date;
	ticketAvailable: boolean;
	ticketPrice: number;
	highlight: boolean;
	description: string;
	name: string;
	link: string;
	imageUrl: string;
	ticketLink: string;

    private static $build(raw) {
        const item = new EventViewModel();
        raw.host === undefined || (item.host = raw.host ? HostViewModel["$build"](raw.host) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.date === undefined || (item.date = raw.date ? new Date(raw.date) : null)
		raw.ticketAvailable === undefined || (item.ticketAvailable = !!raw.ticketAvailable)
		raw.ticketPrice === undefined || (item.ticketPrice = raw.ticketPrice === null ? null : +raw.ticketPrice)
		raw.highlight === undefined || (item.highlight = !!raw.highlight)
		raw.description === undefined || (item.description = raw.description === null ? null : `${raw.description}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.link === undefined || (item.link = raw.link === null ? null : `${raw.link}`)
		raw.imageUrl === undefined || (item.imageUrl = raw.imageUrl === null ? null : `${raw.imageUrl}`)
		raw.ticketLink === undefined || (item.ticketLink = raw.ticketLink === null ? null : `${raw.ticketLink}`)
        
        return item;
    }
}

export class HostViewModel {
    location: LocationViewModel;
	online: boolean;
	updatedAt: Date;
	id: string;
	name: string;

    private static $build(raw) {
        const item = new HostViewModel();
        raw.location === undefined || (item.location = raw.location ? LocationViewModel["$build"](raw.location) : null)
		raw.online === undefined || (item.online = !!raw.online)
		raw.updatedAt === undefined || (item.updatedAt = raw.updatedAt ? new Date(raw.updatedAt) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
        
        return item;
    }
}

export class LocationViewModel {
    id: string;
	name: string;

    private static $build(raw) {
        const item = new LocationViewModel();
        raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
        
        return item;
    }
}

export class FullHostViewModel {
    events: EventViewModel[];
	id: string;
	grabberDateTransformer: string;
	grabber: string;

    private static $build(raw) {
        const item = new FullHostViewModel();
        raw.events === undefined || (item.events = raw.events ? raw.events.map(i => EventViewModel["$build"](i)) : null)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.grabberDateTransformer === undefined || (item.grabberDateTransformer = raw.grabberDateTransformer === null ? null : `${raw.grabberDateTransformer}`)
		raw.grabber === undefined || (item.grabber = raw.grabber === null ? null : `${raw.grabber}`)
        
        return item;
    }
}

export class HostRequestViewModel {
    attempts: number;
	id: string;
	grabberDateTransformer: string;
	error: string;
	name: string;
	address: string;
	grabber: string;

    private static $build(raw) {
        const item = new HostRequestViewModel();
        raw.attempts === undefined || (item.attempts = raw.attempts === null ? null : +raw.attempts)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
		raw.grabberDateTransformer === undefined || (item.grabberDateTransformer = raw.grabberDateTransformer === null ? null : `${raw.grabberDateTransformer}`)
		raw.error === undefined || (item.error = raw.error === null ? null : `${raw.error}`)
		raw.name === undefined || (item.name = raw.name === null ? null : `${raw.name}`)
		raw.address === undefined || (item.address = raw.address === null ? null : `${raw.address}`)
		raw.grabber === undefined || (item.grabber = raw.grabber === null ? null : `${raw.grabber}`)
        
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
    async getEvents(page: number): Promise<Array<EventViewModel>> {
        const $data = new FormData();
        $data.append("hmeWtxc2Nudmh0Mmp2eHBuODtzZXJ4d2", JSON.stringify(page))

        return await fetch(Service.toURL("N4OHQ2YXQ5YWltcTJxMGVsMGZldTJiY2"), {
            method: "post",
            credentials: "include",
            body: $data
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
        const $data = new FormData();
        

        return await fetch(Service.toURL("VtbnJmYTBkdXliYWE5aWI5NGczOGF5ZW"), {
            method: "post",
            credentials: "include",
            body: $data
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

export class HostService {
    async create(name: string, address: string): Promise<void> {
        const $data = new FormData();
        $data.append("dtdX9leWNsbXNwbGU2en5qbWBpZ2U4N3", JSON.stringify(name))
		$data.append("BpZXw4ZDA2ZXJ2NWR5aTtkbGEwaTlzYX", JSON.stringify(address))

        return await fetch(Service.toURL("h0a3ZncTE4NGU0cHV6cWY3NnduYTl6cn"), {
            method: "post",
            credentials: "include",
            body: $data
        }).then(res => res.json()).then(r => {
            if ("error" in r) {
                throw new Error(r.error);
            }

            if ("aborted" in r) {
                throw new Error("request aborted by server");
            }
        });
    }

	async queue(): Promise<Array<HostRequestViewModel>> {
        const $data = new FormData();
        

        return await fetch(Service.toURL("QyZjQwNDB3NWkzbD11eGM1NTBpNXdpNn"), {
            method: "post",
            credentials: "include",
            body: $data
        }).then(res => res.json()).then(r => {
            if ("data" in r) {
                const d = r.data;

                return d.map(d => d === null ? null : HostRequestViewModel["$build"](d));
            } else if ("aborted" in r) {
                throw new Error("request aborted by server");
            } else if ("error" in r) {
                throw new Error(r.error);
            }
        });
    }
}

export class SessionService {
    async createSession(key: string, width: number, height: number): Promise<string> {
        const $data = new FormData();
        $data.append("k5bnhqMWd4OW1iZmt2dmMxeDlsYWdyN3", JSON.stringify(key))
		$data.append("RtcHI5M3c1YWcwbDxia2J2cGZ4aGlmMj", JSON.stringify(width))
		$data.append("hvZ2FqNXgwcTlsNjJpcmZiYTNlemJpZn", JSON.stringify(height))

        return await fetch(Service.toURL("4yZHZpanI3ZnB0aj00d2R2NDFqNHQwa2"), {
            method: "post",
            credentials: "include",
            body: $data
        }).then(res => res.json()).then(r => {
            if ("data" in r) {
                const d = r.data;

                return d === null ? null : `${d}`;
            } else if ("aborted" in r) {
                throw new Error("request aborted by server");
            } else if ("error" in r) {
                throw new Error(r.error);
            }
        });
    }
}