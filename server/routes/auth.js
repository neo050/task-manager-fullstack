// server/routes/auth.js
import express  from 'express';
import bcrypt   from 'bcrypt';
import jwt      from 'jsonwebtoken';
import { db }   from '../db.js';
import { registerLimiter } from '../middlewares/ratelimit.js';
import { JWT_SECRET } from '../config.js';

const router = express.Router();
router.use(registerLimiter);
router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // simple validation
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required' });

    const hash = await bcrypt.hash(password, 10);

    const { rows } = await db.query(
      'INSERT INTO users (email, password_hash) VALUES ($1,$2) RETURNING id',
      [email, hash]
    );
    const token = jwt.sign({ id: rows[0].id }, JWT_SECRET);
    return res.status(201).json({ token });

  } catch (err) {
    // UNIQUE-constraint violation
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    next(err);           // forward everything else to the global handler
  }
});


router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required' });

    const { rows } = await db.query(
      'SELECT id, password_hash FROM users WHERE email = $1',
      [email]
    );
    if (!rows.length)
      return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, rows[0].password_hash);
    if (!match)
      return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: rows[0].id }, JWT_SECRET, {
      expiresIn: '2h',
    });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
});

export default router;
