CREATE TABLE users (
  id serial NOT NULL,
  name text,
  photo text,
  PRIMARY KEY (id)
);

CREATE TABLE listings (
  id serial NOT NULL,
  name text,
  PRIMARY KEY (id)
);

CREATE TABLE reviews (
  id serial NOT NULL,
  listing_id serial NOT NULL,
  user_id serial NOT NULL,
  accuracy integer NOT NULL,
  communication integer NOT NULL,
  cleanliness integer NOT NULL, 
  location integer NOT NULL,
  check_in integer NOT NULL,
  _value integer NOT NULL,
  _date text NOT NULL,
  content text,
  PRIMARY KEY (id),
  FOREIGN KEY (listing_id) REFERENCES listings(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);


