import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
  const header = req.headers.authorization || '';
  const token  = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user   = payload;   
    req.userId = payload.id;   
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid / expired token' });
  }
}
