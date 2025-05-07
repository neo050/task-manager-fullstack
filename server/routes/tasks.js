import express from 'express';
import { db }  from '../db.js';
import { verifyToken } from '../middlewares/auth.js';
import { registerLimiter } from '../middlewares/ratelimit.js';

const router = express.Router();

router.post('/', verifyToken, async (req, res, next) => {
  try {
    const { title, dueDate } = req.body;
    const date = dueDate ? dueDate : null;

    const { rows } = await db.query(
      `INSERT INTO tasks (user_id, title, due_date)
       VALUES ($1,$2,$3) RETURNING *`,
      [req.userId, title, date]
    );
    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
});

router.get('/', verifyToken, async (req, res, next) => {
  try {
    const { rows } = await db.query(
      `SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC`,
      [req.userId]
    );
    res.json(rows);
  } catch (err) { next(err); }
});

export default router;
