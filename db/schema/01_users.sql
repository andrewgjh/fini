DROP TABLE IF EXISTS locations CASCADE;
DROP TABLE IF EXISTS reminders CASCADE;
DROP TABLE IF EXISTS to_do_items CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  icon_url VARCHAR(255)
);

CREATE TABLE to_do_items (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  content VARCHAR(500),
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  priority SMALLINT,
  deadline DATE,
  is_completed BOOLEAN default FALSE,
  created_at TIMESTAMP,
  completed_at TIMESTAMP
);

CREATE TABLE reminders (
  id SERIAL PRIMARY KEY NOT NULL,
  to_do_item_id INTEGER NOT NULL REFERENCES to_do_items(id) ON DELETE CASCADE,
  is_completed BOOLEAN,
  created_at TIMESTAMP
);

CREATE TABLE locations (
  id SERIAL PRIMARY KEY NOT NULL,
  city VARCHAR(100),
  country VARCHAR(100),
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
