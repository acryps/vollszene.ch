CREATE TABLE host_request (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	name TEXT,
	source TEXT,

	attempts INTEGER,
	grabber TEXT,
	grabber_date_transformer TEXT,

	requested TIMESTAMP,
	completed TIMESTAMP,

	error TEXT
);
