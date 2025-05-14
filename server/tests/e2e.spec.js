// tests/e2e.spec.js
import { test, expect } from '@playwright/test';

test('full user flow', async ({ page }) => {
  /* לראות לוגים מה‑Browser בזמן הטסט */
  page.on('console', msg => console.log('[browser]', msg.text()));
  page.on('request', r => {
    if (r.url().includes('/auth')) console.log('[req]', r.method(), r.url());
  });
  

  // ───── 1) עמוד Register ─────
  await page.goto('/register');

  const unique    = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const email     = `e2e+${unique}@example.com`;
  const password  = 'password';

  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.getByLabel(/confirm password/i).fill(password);

  /* מחכים במפורש ל‑201 מה‑API לפני שממשיכים */
  const registerResp = page.waitForResponse(r =>
    r.url().includes('/api/auth/register') && r.status() === 201
  );
  await page.click('button:has-text("Register")');   // submit
  await registerResp;

  // ───── 2) רידיירקט ל‑/login ─────
  await page.waitForURL('/login', { timeout: 5_000 });

  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);

  const loginResp = page.waitForResponse(r =>
    r.url().includes('/api/auth/login') && r.status() === 200
  );
  await page.click('button:has-text("Log In")');
  await loginResp;
  await page.waitForURL('/dashboard', { timeout: 5_000 });

  // ───── 3) יצירת משימה ─────
  await page.fill('input[placeholder="Task title"]', 'E2E Task');
  const createResp = page.waitForResponse(r =>
    r.url().includes('/api/tasks') &&
    r.request().method() === 'POST' &&
    r.status() === 201
  );
  await page.click('button:has-text("Add")');
  await createResp;

  // ───── 4) לוודא שהמשימה מופיעה ─────
  await expect(page.locator('ul li')).toContainText('E2E Task');
});
