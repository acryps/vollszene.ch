INSERT INTO event (date, name, link, hash, image_url, ticket_link, ticket_available, ticket_price, highlight, host_id)
VALUES (NOW(), 'lorem', 'ipsum', 'lorem', 'ipsum', 'lorem', true, 0, false, (
    SELECT id FROM host WHERE name = 'Nordstern'
));
