import { 
	Entity,
	DbSet,
	RunContext,
	QueryUUID,
	QueryProxy,
	QueryString,
	QueryJSON,
	QueryTimeStamp,
	QueryNumber,
	QueryTime,
	QueryDate,
	QueryBoolean,
	QueryBuffer,
	QueryEnum,
	ForeignReference,
	PrimaryReference
} from "vlquery";

export class SessionQueryProxy extends QueryProxy {
	get createdAt(): Partial<QueryTimeStamp> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get height(): Partial<QueryNumber> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get width(): Partial<QueryNumber> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get headers(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get ip(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get key(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
}

export class Session extends Entity<SessionQueryProxy> {
	$$meta = {
		tableName: "session",
		columns: {"id":{"type":"uuid","name":"id"},"createdAt":{"type":"timestamp","name":"created_at"},"height":{"type":"float4","name":"height"},"width":{"type":"float4","name":"width"},"headers":{"type":"text","name":"headers"},"ip":{"type":"text","name":"ip"},"key":{"type":"text","name":"key"}},
		get set(): DbSet<Session, SessionQueryProxy> {
			// returns unbound dbset
			return new DbSet<Session, SessionQueryProxy>(Session, null)
		},
		
	};
		
	constructor() {
		super();

		
	}

	id: string;
	createdAt: Date;
	height: number;
	width: number;
	headers: string;
	ip: string;
	key: string;
}
			
export class LocationQueryProxy extends QueryProxy {
	get name(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
}

export class Location extends Entity<LocationQueryProxy> {
	$$meta = {
		tableName: "location",
		columns: {"id":{"type":"uuid","name":"id"},"name":{"type":"text","name":"name"}},
		get set(): DbSet<Location, LocationQueryProxy> {
			// returns unbound dbset
			return new DbSet<Location, LocationQueryProxy>(Location, null)
		},
		
	};
		
	constructor() {
		super();

		this.hosts = new PrimaryReference<Host, HostQueryProxy>(
			this,
			"locationId",
			Host
		);
	}

	hosts: PrimaryReference<Host, HostQueryProxy>;
					
	id: string;
	name: string;
}
			
export class HostQueryProxy extends QueryProxy {
	get location(): Partial<LocationQueryProxy> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get name(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get provider(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get online(): Partial<QueryBoolean> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get updatedAt(): Partial<QueryTimeStamp> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get locationId(): Partial<QueryUUID> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get origin(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
}

export class Host extends Entity<HostQueryProxy> {
	$$meta = {
		tableName: "host",
		columns: {"id":{"type":"uuid","name":"id"},"name":{"type":"text","name":"name"},"provider":{"type":"text","name":"provider"},"online":{"type":"bool","name":"online"},"updatedAt":{"type":"timestamp","name":"updated_at"},"locationId":{"type":"uuid","name":"location_id"},"origin":{"type":"text","name":"origin"}},
		get set(): DbSet<Host, HostQueryProxy> {
			// returns unbound dbset
			return new DbSet<Host, HostQueryProxy>(Host, null)
		},
		
	};
		
	constructor() {
		super();

		this.events = new PrimaryReference<Event, EventQueryProxy>(
			this,
			"hostId",
			Event
		);
					
		this.$location = new ForeignReference<Location>(
			this,
			"locationId",
			Location
		);
	}

	events: PrimaryReference<Event, EventQueryProxy>;
					
	private $location: ForeignReference<Location>;

	get location(): Partial<ForeignReference<Location>> {
		return this.$location;
	}

	set location(value: Partial<ForeignReference<Location>>) {
		if (value) {
			if (!value.id) {
				throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it.");
			}

			this.locationId = value.id as string;
		} else {
			this.locationId = null;
		}
	}
					
	id: string;
	name: string;
	provider: string;
	online: boolean;
	updatedAt: Date;
	locationId: string;
	origin: string;
}
			
export class AccountQueryProxy extends QueryProxy {
	get firstname(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get lastname(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get username(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get passwordHash(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get key(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get loggedInAt(): Partial<QueryTimeStamp> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
}

export class Account extends Entity<AccountQueryProxy> {
	$$meta = {
		tableName: "account",
		columns: {"id":{"type":"uuid","name":"id"},"firstname":{"type":"text","name":"firstname"},"lastname":{"type":"text","name":"lastname"},"username":{"type":"text","name":"username"},"passwordHash":{"type":"text","name":"password_hash"},"key":{"type":"text","name":"key"},"loggedInAt":{"type":"timestamp","name":"logged_in_at"}},
		get set(): DbSet<Account, AccountQueryProxy> {
			// returns unbound dbset
			return new DbSet<Account, AccountQueryProxy>(Account, null)
		},
		
	};
		
	constructor() {
		super();

		this.createdEvents = new PrimaryReference<Event, EventQueryProxy>(
			this,
			"createdById",
			Event
		);
					
		this.verifiedEvents = new PrimaryReference<Event, EventQueryProxy>(
			this,
			"verifiedById",
			Event
		);
	}

	createdEvents: PrimaryReference<Event, EventQueryProxy>;
					
	verifiedEvents: PrimaryReference<Event, EventQueryProxy>;
					
	id: string;
	firstname: string;
	lastname: string;
	username: string;
	passwordHash: string;
	key: string;
	loggedInAt: Date;
}
			
export class EventQueryProxy extends QueryProxy {
	get createdBy(): Partial<AccountQueryProxy> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get host(): Partial<HostQueryProxy> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get verifiedBy(): Partial<AccountQueryProxy> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get date(): Partial<QueryDate> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get name(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get link(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get hash(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get hostId(): Partial<QueryUUID> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get imageUrl(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get ticketLink(): Partial<QueryString> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get ticketAvailable(): Partial<QueryBoolean> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get ticketPrice(): Partial<QueryNumber> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get highlight(): Partial<QueryBoolean> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get createdAt(): Partial<QueryTimeStamp> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get createdById(): Partial<QueryUUID> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get verifiedById(): Partial<QueryUUID> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get startDate(): Partial<QueryTimeStamp> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
					
	get endDate(): Partial<QueryTimeStamp> {
		throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime");
	}
}

export class Event extends Entity<EventQueryProxy> {
	$$meta = {
		tableName: "event",
		columns: {"id":{"type":"uuid","name":"id"},"date":{"type":"date","name":"date"},"name":{"type":"text","name":"name"},"link":{"type":"text","name":"link"},"hash":{"type":"text","name":"hash"},"hostId":{"type":"uuid","name":"host_id"},"imageUrl":{"type":"text","name":"image_url"},"ticketLink":{"type":"text","name":"ticket_link"},"ticketAvailable":{"type":"bool","name":"ticket_available"},"ticketPrice":{"type":"float4","name":"ticket_price"},"highlight":{"type":"bool","name":"highlight"},"createdAt":{"type":"timestamp","name":"created_at"},"createdById":{"type":"uuid","name":"created_by_id"},"verifiedById":{"type":"uuid","name":"verified_by_id"},"startDate":{"type":"timestamptz","name":"start_date"},"endDate":{"type":"timestamptz","name":"end_date"}},
		get set(): DbSet<Event, EventQueryProxy> {
			// returns unbound dbset
			return new DbSet<Event, EventQueryProxy>(Event, null)
		},
		
	};
		
	constructor() {
		super();

		this.$createdBy = new ForeignReference<Account>(
			this,
			"createdById",
			Account
		);
					
		this.$host = new ForeignReference<Host>(
			this,
			"hostId",
			Host
		);
					
		this.$verifiedBy = new ForeignReference<Account>(
			this,
			"verifiedById",
			Account
		);
	}

	private $createdBy: ForeignReference<Account>;

	get createdBy(): Partial<ForeignReference<Account>> {
		return this.$createdBy;
	}

	set createdBy(value: Partial<ForeignReference<Account>>) {
		if (value) {
			if (!value.id) {
				throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it.");
			}

			this.createdById = value.id as string;
		} else {
			this.createdById = null;
		}
	}
					
	private $host: ForeignReference<Host>;

	get host(): Partial<ForeignReference<Host>> {
		return this.$host;
	}

	set host(value: Partial<ForeignReference<Host>>) {
		if (value) {
			if (!value.id) {
				throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it.");
			}

			this.hostId = value.id as string;
		} else {
			this.hostId = null;
		}
	}
					
	private $verifiedBy: ForeignReference<Account>;

	get verifiedBy(): Partial<ForeignReference<Account>> {
		return this.$verifiedBy;
	}

	set verifiedBy(value: Partial<ForeignReference<Account>>) {
		if (value) {
			if (!value.id) {
				throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it.");
			}

			this.verifiedById = value.id as string;
		} else {
			this.verifiedById = null;
		}
	}
					
	id: string;
	date: Date;
	name: string;
	link: string;
	hash: string;
	hostId: string;
	imageUrl: string;
	ticketLink: string;
	ticketAvailable: boolean;
	ticketPrice: number;
	highlight: boolean;
	createdAt: Date;
	createdById: string;
	verifiedById: string;
	startDate: Date;
	endDate: Date;
}
			

export class DbContext {
	constructor(private runContext: RunContext) {}

	findSet(modelType) {
		for (let key in this) {
			if (this[key] instanceof DbSet) {
				if ((this[key] as any).modelConstructor == modelType) {
					return this[key];
				}
			}
		}
	}

	session: DbSet<Session, SessionQueryProxy> = new DbSet<Session, SessionQueryProxy>(Session, this.runContext);
	location: DbSet<Location, LocationQueryProxy> = new DbSet<Location, LocationQueryProxy>(Location, this.runContext);
	host: DbSet<Host, HostQueryProxy> = new DbSet<Host, HostQueryProxy>(Host, this.runContext);
	account: DbSet<Account, AccountQueryProxy> = new DbSet<Account, AccountQueryProxy>(Account, this.runContext);
	event: DbSet<Event, EventQueryProxy> = new DbSet<Event, EventQueryProxy>(Event, this.runContext);
};