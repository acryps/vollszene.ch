INSERT INTO location (name) VALUES ('Zürich');
INSERT INTO location (name) VALUES ('Luzern');
INSERT INTO location (name) VALUES ('Basel');
INSERT INTO location (name) VALUES ('Bern');

INSERT INTO host (name, provider, online, updated_at, location_id) VALUES ('Rote Fabrik', 'rotefabrik', true, '2023-04-07 13:08:50.516', (
	SELECT id FROM location WHERE name = 'Zürich'
));

INSERT INTO host (name, provider, online, updated_at, location_id) VALUES ('Kauz', 'kauz', true, '2023-04-07 13:03:06.355', (
	SELECT id FROM location WHERE name = 'Zürich'
));

INSERT INTO host (name, provider, online, updated_at, location_id) VALUES ('MOLO Bar', 'molobar', true, '2023-04-07 13:03:06.359', (
	SELECT id FROM location WHERE name = 'Luzern'
));

INSERT INTO host (name, provider, online, updated_at, location_id) VALUES ('Gwärbi', 'gwärbi', true, '2023-04-07 13:03:06.379', (
	SELECT id FROM location WHERE name = 'Luzern'
));

INSERT INTO host (name, provider, online, updated_at, location_id) VALUES ('Grosse Halle', 'grosse-halle', false, '2023-03-14 12:29:48.295', (
	SELECT id FROM location WHERE name = 'Bern'
));

INSERT INTO host (name, provider, online, updated_at, location_id) VALUES ('Exil', 'exil', true, '2023-04-07 13:03:07.259', (
	SELECT id FROM location WHERE name = 'Zürich'
));

INSERT INTO host (name, provider, online, updated_at, location_id) VALUES ('Friedas Büxe', 'friedasbuexe', false, '2023-01-06 23:44:22.396', (
	SELECT id FROM location WHERE name = 'Zürich'
));

INSERT INTO host (name, provider, online, updated_at, location_id) VALUES ('ZentralWaescherei', 'zentralwaescherei', false, '2022-06-23 19:41:17.911', (
	SELECT id FROM location WHERE name = 'Zürich'
));

INSERT INTO host (name, provider, online, updated_at, location_id) VALUES ('Kegelbahn', 'kegelbahn', true, '2023-04-07 13:03:09.994', (
	SELECT id FROM location WHERE name = 'Luzern'
));

INSERT INTO host (name, provider, online, updated_at, location_id) VALUES ('Amboss Rampe', 'amboss-rampe', true, '2023-04-07 13:03:10.932', (
	SELECT id FROM location WHERE name = 'Zürich'
));

INSERT INTO host (name, provider, online, updated_at, location_id) VALUES ('Club Zukunft', 'zuki', true, '2023-04-07 13:03:12.036', (
	SELECT id FROM location WHERE name = 'Zürich'
));

INSERT INTO host (name, provider, online, updated_at, location_id) VALUES ('Sedel', 'sedel', true, '2023-04-07 13:03:12.419', (
	SELECT id FROM location WHERE name = 'Luzern'
));

INSERT INTO host (name, provider, online, updated_at, location_id) VALUES ('Nordstern', 'nordstern', true, '2023-04-07 13:03:06.788', (
	SELECT id FROM location WHERE name = 'Basel'
));

INSERT INTO host (name, provider, online, updated_at, location_id) VALUES ('Dachstock', 'dachstock', true, '2023-04-07 13:03:09.656', (
	SELECT id FROM location WHERE name = 'Bern'
));

INSERT INTO host (name, provider, online, updated_at, location_id) VALUES ('Supermarket', 'supermarket', true, '2023-04-07 13:03:13.849', (
	SELECT id FROM location WHERE name = 'Zürich'
));

INSERT INTO host (name, provider, online, updated_at, location_id) VALUES ('Helsinkiklub', 'helsinki', true, '2023-04-07 13:03:14.365', (
	SELECT id FROM location WHERE name = 'Zürich'
));

INSERT INTO host (name, provider, online, updated_at, location_id) VALUES ('Südpol', 'südpol', true, '2023-04-07 13:03:14.412', (
	SELECT id FROM location WHERE name = 'Luzern'
));

INSERT INTO host (name, provider, online, updated_at, location_id) VALUES ('Hive', 'hive', true, '2023-04-07 13:03:14.599', (
	SELECT id FROM location WHERE name = 'Zürich'
));
