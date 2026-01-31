import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.swifttranslator.com/';

test.describe('UI Performance and Behavior Tests', () => {

  test('Pos_UI_0003 - Numeric input handled without UI crash', async ({ page }) => {
    await page.goto(BASE_URL);

    const inputArea = page.locator('textarea');
    const outputDiv = page.locator('div.bg-slate-50.whitespace-pre-wrap');

    await inputArea.fill('1234567890');

    await expect(outputDiv).toBeVisible();
    await page.waitForTimeout(2000);
  });

});
