
export function requireFields(...fields) {
    return (req, res, next) => {
      const missing = fields.filter(f => !req.body?.[f]);
      if (missing.length) {
        return res.status(400).json({
          error: `Missing required field(s): ${missing.join(', ')}`
        });
      }
      next();
    };
  }
  