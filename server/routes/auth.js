import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
const router   = express.Router();
const db       = new Pool();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hash  = await bcrypt.hash(password, 10);

  const { rows } = await db.query(
    'INSERT INTO users (email, password_hash) VALUES ($1,$2) RETURNING id',
    [email, hash]
  );

  const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET);
  res.status(201).json({ token });
});

export default router;