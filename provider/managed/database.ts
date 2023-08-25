import { Entity, DbSet, RunContext, QueryUUID, QueryProxy, QueryString, QueryJSON, QueryTimeStamp, QueryNumber, QueryTime, QueryDate, QueryBoolean, QueryBuffer, QueryEnum, ForeignReference, PrimaryReference, View, ViewSet } from "vlquery";

export class LocationQueryProxy extends QueryProxy {
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Location extends Entity<LocationQueryProxy> {
	hosts: PrimaryReference<Host, HostQueryProxy>;
		declare id: string;
	name: string;
	

	$$meta = {
		source: "location",

		columns: {
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" }
		},

		get set(): DbSet<Location, LocationQueryProxy> { 
			return new DbSet<Location, LocationQueryProxy>(Location, null);
		}
	};
	
	constructor() {
		super();
		
		this.hosts = new PrimaryReference<Host, HostQueryProxy>(this, "locationId", Host);
	}
}
			
export class HostQueryProxy extends QueryProxy {
	get location(): Partial<LocationQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get online(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get updatedAt(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get locationId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get provider(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Host extends Entity<HostQueryProxy> {
	events: PrimaryReference<Event, EventQueryProxy>;
		get location(): Partial<ForeignReference<Location>> { return this.$location; }
	declare id: string;
	online: boolean;
	updatedAt: Date;
	locationId: string;
	name: string;
	provider: string;
	

	$$meta = {
		source: "host",

		columns: {
			id: { type: "uuid", name: "id" },
			online: { type: "bool", name: "online" },
			updatedAt: { type: "timestamp", name: "updated_at" },
			locationId: { type: "uuid", name: "location_id" },
			name: { type: "text", name: "name" },
			provider: { type: "text", name: "provider" }
		},

		get set(): DbSet<Host, HostQueryProxy> { 
			return new DbSet<Host, HostQueryProxy>(Host, null);
		}
	};
	
	constructor() {
		super();
		
		this.events = new PrimaryReference<Event, EventQueryProxy>(this, "hostId", Event);
		this.$location = new ForeignReference<Location>(this, "locationId", Location);
	}
	
	
	private $location: ForeignReference<Location>;

	set location(value: Partial<ForeignReference<Location>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.locationId = value.id as string;
		} else {
			this.locationId = null;
		}
	}
					
}
			
export class EventQueryProxy extends QueryProxy {
	get host(): Partial<HostQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get date(): Partial<QueryDate> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get ticketAvailable(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get ticketPrice(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get highlight(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get hostId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get ticketLink(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get link(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get hash(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get imageUrl(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Event extends Entity<EventQueryProxy> {
	get host(): Partial<ForeignReference<Host>> { return this.$host; }
	declare id: string;
	date: Date;
	ticketAvailable: boolean;
	ticketPrice: number;
	highlight: boolean;
	hostId: string;
	ticketLink: string;
	name: string;
	link: string;
	hash: string;
	imageUrl: string;
	

	$$meta = {
		source: "event",

		columns: {
			id: { type: "uuid", name: "id" },
			date: { type: "date", name: "date" },
			ticketAvailable: { type: "bool", name: "ticket_available" },
			ticketPrice: { type: "float4", name: "ticket_price" },
			highlight: { type: "bool", name: "highlight" },
			hostId: { type: "uuid", name: "host_id" },
			ticketLink: { type: "text", name: "ticket_link" },
			name: { type: "text", name: "name" },
			link: { type: "text", name: "link" },
			hash: { type: "text", name: "hash" },
			imageUrl: { type: "text", name: "image_url" }
		},

		get set(): DbSet<Event, EventQueryProxy> { 
			return new DbSet<Event, EventQueryProxy>(Event, null);
		}
	};
	
	constructor() {
		super();
		
		this.$host = new ForeignReference<Host>(this, "hostId", Host);
	}
	
	
	private $host: ForeignReference<Host>;

	set host(value: Partial<ForeignReference<Host>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.hostId = value.id as string;
		} else {
			this.hostId = null;
		}
	}
					
}
			
export class SessionQueryProxy extends QueryProxy {
	get height(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get createdAt(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get width(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get key(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get ip(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get headers(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Session extends Entity<SessionQueryProxy> {
	height: number;
	createdAt: Date;
	declare id: string;
	width: number;
	key: string;
	ip: string;
	headers: string;
	

	$$meta = {
		source: "session",

		columns: {
			height: { type: "float4", name: "height" },
			createdAt: { type: "timestamp", name: "created_at" },
			id: { type: "uuid", name: "id" },
			width: { type: "float4", name: "width" },
			key: { type: "text", name: "key" },
			ip: { type: "text", name: "ip" },
			headers: { type: "text", name: "headers" }
		},

		get set(): DbSet<Session, SessionQueryProxy> { 
			return new DbSet<Session, SessionQueryProxy>(Session, null);
		}
	};
}
			

export class DbContext {
	location: DbSet<Location, LocationQueryProxy>;
	host: DbSet<Host, HostQueryProxy>;
	event: DbSet<Event, EventQueryProxy>;
	session: DbSet<Session, SessionQueryProxy>;

	constructor(private runContext: RunContext) {
		this.location = new DbSet<Location, LocationQueryProxy>(Location, this.runContext);
		this.host = new DbSet<Host, HostQueryProxy>(Host, this.runContext);
		this.event = new DbSet<Event, EventQueryProxy>(Event, this.runContext);
		this.session = new DbSet<Session, SessionQueryProxy>(Session, this.runContext);
	}

	findSet(modelType) {
		for (let key in this) {
			if (this[key] instanceof DbSet) {
				if ((this[key] as any).modelConstructor == modelType) {
					return this[key];
				}
			}
		}
	}

	
};