import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('checks homepage', async ({ page }) => {
  await page.goto('/');
  // the nav is there
  await expect(page.locator('nav ul>*')).toHaveCount(3);
  // the header is there
  await expect(page.locator('h1')).toHaveText('Oma Recipes');
  let recipeCards = page.locator('.grid .recipeCard');
  // there is more than 3
  expect(await recipeCards.count()).toBeGreaterThan(3);
  // the first recipe card has a title
  expect(await recipeCards.nth(0).locator('h2').innerText()).toBeTruthy();
});
