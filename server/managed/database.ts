import { Entity, DbSet, RunContext, QueryUUID, QueryProxy, QueryString, QueryJSON, QueryTimeStamp, QueryNumber, QueryTime, QueryDate, QueryBoolean, QueryBuffer, QueryEnum, ForeignReference, PrimaryReference, View, ViewSet } from "vlquery";

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
			
export class EventQueryProxy extends QueryProxy {
	get host(): Partial<HostQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get date(): Partial<QueryDate> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get ticketAvailable(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get ticketPrice(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get highlight(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get hostId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get description(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get link(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get hash(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get imageUrl(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get ticketLink(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Event extends Entity<EventQueryProxy> {
	get host(): Partial<ForeignReference<Host>> { return this.$host; }
	date: Date;
	ticketAvailable: boolean;
	ticketPrice: number;
	highlight: boolean;
	hostId: string;
	declare id: string;
	description: string;
	name: string;
	link: string;
	hash: string;
	imageUrl: string;
	ticketLink: string;
	

	$$meta = {
		source: "event",

		columns: {
			date: { type: "date", name: "date" },
			ticketAvailable: { type: "bool", name: "ticket_available" },
			ticketPrice: { type: "float4", name: "ticket_price" },
			highlight: { type: "bool", name: "highlight" },
			hostId: { type: "uuid", name: "host_id" },
			id: { type: "uuid", name: "id" },
			description: { type: "text", name: "description" },
			name: { type: "text", name: "name" },
			link: { type: "text", name: "link" },
			hash: { type: "text", name: "hash" },
			imageUrl: { type: "text", name: "image_url" },
			ticketLink: { type: "text", name: "ticket_link" }
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
			
export class HostQueryProxy extends QueryProxy {
	get location(): Partial<LocationQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get online(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get updatedAt(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get locationId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get public(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get grabberDateTransformer(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get address(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get grabbingAddress(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get grabber(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Host extends Entity<HostQueryProxy> {
	events: PrimaryReference<Event, EventQueryProxy>;
		get location(): Partial<ForeignReference<Location>> { return this.$location; }
	online: boolean;
	updatedAt: Date;
	locationId: string;
	public: boolean;
	declare id: string;
	grabberDateTransformer: string;
	name: string;
	address: string;
	grabbingAddress: string;
	grabber: string;
	

	$$meta = {
		source: "host",

		columns: {
			online: { type: "bool", name: "online" },
			updatedAt: { type: "timestamp", name: "updated_at" },
			locationId: { type: "uuid", name: "location_id" },
			public: { type: "bool", name: "public" },
			id: { type: "uuid", name: "id" },
			grabberDateTransformer: { type: "text", name: "grabber_date_transformer" },
			name: { type: "text", name: "name" },
			address: { type: "text", name: "address" },
			grabbingAddress: { type: "text", name: "grabbing_address" },
			grabber: { type: "text", name: "grabber" }
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
			
export class HostRequestQueryProxy extends QueryProxy {
	get attempts(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get requested(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get completed(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get grabberDateTransformer(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get error(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get address(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get grabber(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class HostRequest extends Entity<HostRequestQueryProxy> {
	attempts: number;
	requested: Date;
	completed: Date;
	declare id: string;
	grabberDateTransformer: string;
	error: string;
	name: string;
	address: string;
	grabber: string;
	

	$$meta = {
		source: "host_request",

		columns: {
			attempts: { type: "int4", name: "attempts" },
			requested: { type: "timestamp", name: "requested" },
			completed: { type: "timestamp", name: "completed" },
			id: { type: "uuid", name: "id" },
			grabberDateTransformer: { type: "text", name: "grabber_date_transformer" },
			error: { type: "text", name: "error" },
			name: { type: "text", name: "name" },
			address: { type: "text", name: "address" },
			grabber: { type: "text", name: "grabber" }
		},

		get set(): DbSet<HostRequest, HostRequestQueryProxy> { 
			return new DbSet<HostRequest, HostRequestQueryProxy>(HostRequest, null);
		}
	};
}
			

export class DbContext {
	session: DbSet<Session, SessionQueryProxy>;
	location: DbSet<Location, LocationQueryProxy>;
	event: DbSet<Event, EventQueryProxy>;
	host: DbSet<Host, HostQueryProxy>;
	hostRequest: DbSet<HostRequest, HostRequestQueryProxy>;

	constructor(private runContext: RunContext) {
		this.session = new DbSet<Session, SessionQueryProxy>(Session, this.runContext);
		this.location = new DbSet<Location, LocationQueryProxy>(Location, this.runContext);
		this.event = new DbSet<Event, EventQueryProxy>(Event, this.runContext);
		this.host = new DbSet<Host, HostQueryProxy>(Host, this.runContext);
		this.hostRequest = new DbSet<HostRequest, HostRequestQueryProxy>(HostRequest, this.runContext);
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