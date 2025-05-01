CREATE TABLE IF NOT EXISTS tasks (
  id         SERIAL PRIMARY KEY,
  user_id    INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  due_date   DATE,
  created_at TIMESTAMP DEFAULT NOW()
);