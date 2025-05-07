// tests/e2e.spec.js
import { test, expect } from '@playwright/test';

test('full user flow', async ({ page }) => {
  // 1) hit the React view
  await page.goto('/register');     // ← NOT /auth/register

  // fill & submit the form
  await page.fill('input[type="email"]',    'bob3396@gmail.com');
  await page.fill('input[type="password"]', 'password');
  await page.getByLabel('Confirm Password').fill('password');
  await page.click('button:has-text("Register")');

  // 2) after success, React does `navigate('/login')`
  await expect(page).toHaveURL('/login');  

  // login form
  await page.fill('input[type="email"]',    'bob3396@gmail.com');
  await page.fill('input[type="password"]', 'password');
  await page.click('button:has-text("Log In")');
  await expect(page).toHaveURL('/dashboard');          // dashboard

  // 3) create a task
  await page.waitForSelector('input[placeholder="Task title"]');
  await page.fill('input[placeholder="Task title"]', 'E2E Task');
  await page.click('button:has-text("Add")');

  // 4) assert it appears
  await expect(page.locator('ul li')).toContainText('E2E Task');
});
