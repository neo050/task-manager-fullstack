// server/config.js
export const JWT_SECRET =
  process.env.JWT_SECRET ??
  (process.env.NODE_ENV === 'test'
    ? 'testsecret'                       // used only during Jest / Playwright
    : (() => {
        throw new Error(
          'JWT_SECRET environment variable is required in production/dev'
        );
      })());
