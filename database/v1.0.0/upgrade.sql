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

-- Add locations
INSERT INTO location (name)
VALUES ('Luzern');

INSERT INTO location (name)
VALUES ('Bern');

INSERT INTO location (name)
VALUES ('Zürich');

INSERT INTO location (name)
VALUES ('Basel');

-- Add clubs entries
INSERT INTO host (name, provider, online, updated_at, location_id)
VALUES ('Club Zukunft', 'zuki', true, NOW(), (
    SELECT id FROM location WHERE name = 'Zürich'
));

INSERT INTO host (name, provider, online, updated_at, location_id)
VALUES ('Nordstern', 'nordstern', true, NOW(), (
    SELECT id FROM location WHERE name = 'Basel'
));

INSERT INTO host (name, provider, online, updated_at, location_id)
VALUES ('MOLO Bar', 'molobar', false, NOW(), (
    SELECT id FROM location WHERE name = 'Luzern'
));

INSERT INTO host (name, provider, online, updated_at, location_id)
VALUES ('ZentralWaescherei', 'zentralwaescherei', false, NOW(), (
    SELECT id FROM location WHERE name = 'Zürich'
));

INSERT INTO host (name, provider, online, updated_at, location_id)
VALUES ('Hive', 'hive', true, NOW(), (
    SELECT id FROM location WHERE name = 'Zürich'
));

INSERT INTO host (name, provider, online, updated_at, location_id)
VALUES ('Südpol', 'südpol', true, NOW(), (
    SELECT id FROM location WHERE name = 'Luzern'
));

INSERT INTO host (name, provider, online, updated_at, location_id)
VALUES ('Helsinkiklub', 'helsinki', true, NOW(), (
    SELECT id FROM location WHERE name = 'Zürich'
));

INSERT INTO host (name, provider, online, updated_at, location_id)
VALUES ('Kauz', 'kauz', true, NOW(), (
    SELECT id FROM location WHERE name = 'Zürich'
));

INSERT INTO host (name, provider, online, updated_at, location_id)
VALUES ('Sedel', 'sedel', true, NOW(), (
    SELECT id FROM location WHERE name = 'Luzern'
));

INSERT INTO host (name, provider, online, updated_at, location_id)
VALUES ('Friedas Büxe', 'friedasbuexe', false, NOW(), (
    SELECT id FROM location WHERE name = 'Zürich'
));

INSERT INTO host (name, provider, online, updated_at, location_id)
VALUES ('Kegelbahn', 'kegelbahn', false, NOW(), (
    SELECT id FROM location WHERE name = 'Luzern'
));

INSERT INTO host (name, provider, online, updated_at, location_id)
VALUES ('Supermarket', 'supermarket', true, NOW(), (
    SELECT id FROM location WHERE name = 'Zürich'
));

INSERT INTO host (name, provider, online, updated_at, location_id)
VALUES ('Dachstock', 'dachstock', true, NOW(), (
    SELECT id FROM location WHERE name = 'Bern'
));

INSERT INTO host (name, provider, online, updated_at, location_id)
VALUES ('Amboss Rampe', 'ambos rampe', false, NOW(), (
    SELECT id FROM location WHERE name = 'Zürich'
));

INSERT INTO host (name, provider, online, updated_at, location_id)
VALUES ('Gwärbi', 'gwärbi', false, NOW(), (
    SELECT id FROM location WHERE name = 'Luzern'
));

INSERT INTO host (name, provider, online, updated_at, location_id)
VALUES ('Grosse Halle', 'grosse-halle', false, NOW(), (
    SELECT id FROM location WHERE name = 'Bern'
));

INSERT INTO host (name, provider, online, updated_at, location_id)
VALUES ('Rote Fabrik', 'rotefabrik', true, NOW(), (
    SELECT id FROM location WHERE name = 'Zürich'
));

INSERT INTO host (name, provider, online, updated_at, location_id)
VALUES ('Exil', 'exil', true, NOW(), (
    SELECT id FROM location WHERE name = 'Zürich'
));
