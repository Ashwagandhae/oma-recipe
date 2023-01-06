import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('checks general recipe page', async ({ page }) => {
  await page.goto('#/recipe/omaKuchen');
  // the nav is there
  await expect(page.locator('nav ul>*')).toHaveCount(3);
  // the header is there
  await expect(page.locator('header>h2')).toHaveText('Oma Kuchen');
  // ingredients are there
  await expect(page.locator('.recipe h1').nth(0)).toHaveText('Ingredients');
  // expect count of ingredients to be more than 5
  expect(
    await page.locator('.recipe .ingredients .ingredient').count()
  ).toBeGreaterThan(5);
  // instructions are there
  await expect(page.locator('.recipe h1').nth(1)).toHaveText('Instructions');
  // expect count of instructions to be more than 5
  expect(
    await page.locator('.recipe .instructions .instruction').count()
  ).toBeGreaterThan(5);
});
