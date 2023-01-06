import { test, expect } from '@playwright/test';

test('checks instructions', async ({ page }) => {
  await page.goto('#/recipe/omaKuchen');

  // instruction is there
  let instruction = page.locator('.recipe .instructions .instruction').nth(0);
  await expect(instruction.locator('.title')).toContainText('Melt the butter');
  await expect(instruction.locator('.title .index')).toContainText('1');
  await expect(instruction.locator('p')).toContainText(
    'Put butter in a large bowl, and repeatedly microwave it for 30 seconds until it becomes soft - not soup.'
  );
  // use checkbox button
  await instruction.locator('.index').click();
  // instruction is checked
  await expect(instruction).toHaveClass(/checked/);
  // use checkbox button again
  await instruction.locator('.index').click();
  // instruction is unchecked
  await expect(instruction).not.toHaveClass(/checked/);
});
