DROP TABLE IF EXISTS reminders CASCADE;

CREATE TABLE reminders (
  id SERIAL PRIMARY KEY NOT NULL,
  to_do_item_id INTEGER NOT NULL REFERENCES to_do_items(id) ON DELETE CASCADE,
  is_completed BOOLEAN,
  created_at TIMESTAMP
);

