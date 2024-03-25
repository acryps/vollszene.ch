ALTER TABLE host DROP provider;

ALTER TABLE host ADD address TEXT;
ALTER TABLE host ADD grabbing_address TEXT;
ALTER TABLE host ADD grabber TEXT;
ALTER TABLE host ADD grabber_date_transformer TEXT;

ALTER TABLE host ADD public BOOLEAN;

ALTER TABLE event ADD description TEXT;
