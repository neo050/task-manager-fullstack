// server/config.js
export const JWT_SECRET = (() => {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
  if (process.env.NODE_ENV === 'test') return 'testsecret';   // local/Jest only
  throw new Error('JWT_SECRET is required (set it in the environment)');
})();
