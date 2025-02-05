UPDATE host_request SET attempts = 0, error = '', grabber = '', grabber_date_transformer = '' WHERE completed IS NULL;
