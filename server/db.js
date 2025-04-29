import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
export const db = new pg.Pool({
    host:     process.env.PGHOST,
    port:     Number(process.env.PGPORT || 5879),
    user:     process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  });




