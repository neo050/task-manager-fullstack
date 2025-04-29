
// server/index.js  (ES Modules)

import express from 'express';
import cors    from 'cors';
import dotenv  from 'dotenv';
import authRouter from './routes/auth.js';
import { db }  from './db.js';

dotenv.config();

const app = express();

// ─────────────── Middlewares ───────────────
app.use(cors());
app.use(express.json());

// ─────────────── Routes ───────────────
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));
app.use('/auth', authRouter);

// ─────────────── Global Error-Handler ───────────────
// * Must be placed AFTER all routes to catch their errors *
app.use((err, req, res, _next) => {
  console.error('❌', err);
  const status = res.statusCode >= 400 ? res.statusCode : 500;
  res.status(status).json({ error: err.message || 'Server error' });
});

// ─────────────── Start the server only if DB is reachable ───────────────
db.query('SELECT 1')
  .then(() => {
    app.listen(3001, () => console.log('✅  API listening on 3001'));
  })
  .catch(err => {
    console.error('PG connection failed →', err);
    process.exit(1);           // Exit so we don’t run without a DB
  });
