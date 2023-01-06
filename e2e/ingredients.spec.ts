import { test, expect } from '@playwright/test';

test('checks ingredients', async ({ page }) => {
  await page.goto('#/recipe/omaKuchen');

  // ingredient is there
  let ingredient = page.locator('.recipe .ingredients .ingredient').nth(0);
  await expect(ingredient.locator('.name')).toHaveText('Powder Sugar');
  await expect(ingredient.locator('.amount')).toHaveText('250');
  await expect(ingredient.locator('.unit')).toHaveText('g');
  // second ingredient is there
  ingredient = page.locator('.recipe .ingredients .ingredient').nth(1);
  await expect(ingredient.locator('.name')).toHaveText('Flour');
  await expect(ingredient.locator('.amount')).toHaveText('400');
  await expect(ingredient.locator('.unit')).toHaveText('g');
  // use checkbox button
  await ingredient.locator('button').click();
  // ingredient is checked
  await expect(ingredient).toHaveClass(/checked/);
  // use checkbox button again
  await ingredient.locator('button').click();
  // ingredient is unchecked
  await expect(ingredient).not.toHaveClass(/checked/);
});
