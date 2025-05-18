// server/config.js
import crypto from 'node:crypto';

export const JWT_SECRET = (() => {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
  if (process.env.NODE_ENV === 'test')
    return crypto.randomBytes(32).toString('hex');
  throw new Error('JWT_SECRET is required');
})();
