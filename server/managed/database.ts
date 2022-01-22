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

export class EventQueryProxy extends QueryProxy {
	get host(): Partial<HostQueryProxy> {
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
}

export class Event extends Entity<EventQueryProxy> {
	$$meta = {
		tableName: "event",
		columns: {"id":{"type":"uuid","name":"id"},"date":{"type":"date","name":"date"},"name":{"type":"text","name":"name"},"link":{"type":"text","name":"link"},"hash":{"type":"text","name":"hash"},"hostId":{"type":"uuid","name":"host_id"}},
		get set(): DbSet<Event, EventQueryProxy> {
			// returns unbound dbset
			return new DbSet<Event, EventQueryProxy>(Event, null)
		},
		
	};
		
	constructor() {
		super();

		this.$host = new ForeignReference<Host>(
			this,
			"hostId",
			Host
		);
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
					
	id: string;
	date: Date;
	name: string;
	link: string;
	hash: string;
	hostId: string;
}
			
export class HostQueryProxy extends QueryProxy {
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
}

export class Host extends Entity<HostQueryProxy> {
	$$meta = {
		tableName: "host",
		columns: {"id":{"type":"uuid","name":"id"},"name":{"type":"text","name":"name"},"provider":{"type":"text","name":"provider"},"online":{"type":"bool","name":"online"},"updatedAt":{"type":"timestamp","name":"updated_at"}},
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
	}

	events: PrimaryReference<Event, EventQueryProxy>;
					
	id: string;
	name: string;
	provider: string;
	online: boolean;
	updatedAt: Date;
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

	event: DbSet<Event, EventQueryProxy> = new DbSet<Event, EventQueryProxy>(Event, this.runContext);
	host: DbSet<Host, HostQueryProxy> = new DbSet<Host, HostQueryProxy>(Host, this.runContext);
};