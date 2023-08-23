CREATE TABLE location (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	name TEXT
);

CREATE TABLE host (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	name TEXT,
	provider TEXT,

	online BOOLEAN,
	updated_at TIMESTAMP,

	location_id UUID CONSTRAINT location__hosts REFERENCES location (id)
);

CREATE TABLE event (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	date DATE,
	name TEXT,
	link TEXT,
	hash TEXT,
	image_url TEXT,

	ticket_link TEXT,
	ticket_available BOOLEAN,
	ticket_price REAL,

	highlight BOOLEAN,

	host_id UUID CONSTRAINT host__events REFERENCES host (id)
);

CREATE TABLE session (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	key TEXT,
	created_at TIMESTAMP,

	height REAL,
	width REAL,
	
	headers TEXT,
	ip TEXT
);