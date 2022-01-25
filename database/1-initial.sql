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

    host_id UUID CONSTRAINT host__events REFERENCES host (id)
);