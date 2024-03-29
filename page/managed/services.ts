export class EventViewModel {
    host: HostViewModel;
	date: Date;
	ticketAvailable: boolean;
	ticketPrice: number;
	highlight: boolean;
	id: string;
	name: string;
	link: string;
	imageUrl: string;
	ticketLink: string;

    private static $build(raw) {
        const item = new EventViewModel();
        raw.host === undefined || (item.host = raw.host ? HostViewModel["$build"](raw.host) : null)
		raw.date === undefined || (item.date = raw.date ? new Date(raw.date) : null)
		raw.ticketAvailable === undefined || (item.ticketAvailable = !!raw.ticketAvailable)
		raw.ticketPrice === undefined || (item.ticketPrice = raw.ticketPrice === null ? null : +raw.ticketPrice)
		raw.highlight === undefined || (item.highlight = !!raw.highlight)
		raw.id === undefined || (item.id = raw.id === null ? null : `${raw.id}`)
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

export class Service {
    static baseUrl = "";

    static toURL(request) {
        return `${this.baseUrl}${request}`;
    }
}

export class EventService {
    async getEvents(location: string): Promise<Array<EventViewModel>> {
        const $data = new FormData();
        $data.append("1tdDpvdTFidDJhMDM5Zjl5dWUxeD01MD", JSON.stringify(location))

        return await fetch(Service.toURL("80YThweDRlbTdtbTs2NTc2OXpyeXx0d3"), {
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
    async create(name: string, address: string, grabbingAddress: string): Promise<FullHostViewModel> {
        const $data = new FormData();
        $data.append("sza3N3bXVja3hhajk1NHppYWZmZTN4dW", JSON.stringify(name))
		$data.append("x4bmhicjd4cGlpdHBxMXJ3Mms2bGlwZm", JSON.stringify(address))
		$data.append("lzNG01dHFrcDcyYXluZml4OGFwaDZyaj", JSON.stringify(grabbingAddress))

        return await fetch(Service.toURL("A5dmduM3dkOHN5MGtvcWNkOWgydHVhcT"), {
            method: "post",
            credentials: "include",
            body: $data
        }).then(res => res.json()).then(r => {
            if ("data" in r) {
                const d = r.data;

                return d === null ? null : FullHostViewModel["$build"](d);
            } else if ("aborted" in r) {
                throw new Error("request aborted by server");
            } else if ("error" in r) {
                throw new Error(r.error);
            }
        });
    }

	async release(id: string): Promise<void> {
        const $data = new FormData();
        $data.append("F6NHYzcjFzZHhwdHpzeTg5dGVpc3hwbn", JSON.stringify(id))

        return await fetch(Service.toURL("JuZ2Uyamo2NTYyajB2Njsxc2F5aHV6MX"), {
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