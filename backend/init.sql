CREATE TABLE users (
  id serial PRIMARY KEY,
  firstName VARCHAR NOT NULL,
  lastName VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  phone VARCHAR,
  role VARCHAR NOT NULL
);