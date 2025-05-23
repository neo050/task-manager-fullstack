// server/index.js  (ES modules)

import express from 'express';
import cors    from 'cors';
import dotenv  from 'dotenv';
import authRouter from './routes/auth.js';
import { db }  from './db.js';
import { verifyToken } from './middlewares/auth.js';
import { registerLimiter } from './middlewares/ratelimit.js';
import tasksRouter from './routes/tasks.js';
dotenv.config();

export const app = express();          // expose for Supertest
// ─── Trust proxy so rate-limit can use X-Forwarded-For ─────
app.set('trust proxy', 1);  // or `true` in development

// ────────── Middlewares ──────────
app.use(cors());
app.use(express.json());
app.use(registerLimiter);
// ───────────── Routes ────────────
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRouter);
app.use('/api/tasks', tasksRouter);

// ─────── Global error-handler ───────
app.use((err, req, res, _next) => {
  console.error('❌', err);
  const status = res.statusCode >= 400 ? res.statusCode : 500;
  res.status(status).json({ error: err.message || 'Server error' });
});
app.get('/api/protected', verifyToken, (_, res) => res.json({ ok: true }));

// ─────── Boot only when DB is ready ───────
db.query('SELECT 1')
  .then(() => {
    if (process.env.NODE_ENV !== 'test') {
      app.listen(3001, () => console.log('✅  API listening on 3001'));
    }
  })
  .catch((err) => {
    console.error('PG connection failed →', err);
    process.exit(1);
  });




export default app;                     // Supertest imports this
