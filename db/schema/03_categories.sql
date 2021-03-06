DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  icon_url VARCHAR(255),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
