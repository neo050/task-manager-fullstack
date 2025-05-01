// server/middlewares/ratelimit.js
import rateLimit from 'express-rate-limit';

export const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: 100,                     // 5 requests per window
  standardHeaders: true,      // adds RateLimit-* headers
  legacyHeaders: false,
  message: { error: 'Too many registration attempts. Try again later.' },
});
