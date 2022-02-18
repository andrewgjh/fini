DROP TABLE IF EXISTS to_do_items CASCADE;

CREATE TABLE to_do_items (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  content VARCHAR(500),
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  priority SMALLINT,
  deadline TIMESTAMP,
  is_completed BOOLEAN default FALSE,
  created_at TIMESTAMP,
  completed_at TIMESTAMP
);
