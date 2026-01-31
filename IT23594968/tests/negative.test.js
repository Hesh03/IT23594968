import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.swifttranslator.com/';

const negativeCases = [
  { id: 'Neg_Fun_0001', input: '!!!???', expected: '!???' },
  { id: 'Neg_Fun_0002', input: 'ekakohomadhameeka', expected: 'එකොහොමදමේක' },
  { id: 'Neg_Fun_0003', input: 'run ran running', expected: 'ru රන් running' },
  { id: 'Neg_Fun_0004', input: 'こんにちは', expected: 'こんにちは' },
  { id: 'Neg_Fun_0005', input: '123456789', expected: '1234789' },
  { id: 'Neg_Fun_0006', input: '    ', expected: 'ERROR' }, // spaces only
  { id: 'Neg_Fun_0007', input: 'mixed 123 symbols @#$', expected: 'mixed 123 symbols @#$' },
  { id: 'Neg_Fun_0008', input: 'invalid_singlish_characters', expected: 'invalid_සින්ග්ලිශ්_characters' },
  { id: 'Neg_Fun_0009', input: 'VeryLongInputWithoutSpacesToTestRobustness', expected: 'ValidTranslation' },
  { id: 'Neg_Fun_0010', input: '<html>test</html>', expected: '<හ්ට්ම්ල්>test</හ්ට්ම්ල්>' }
];

test.describe('Negative Functional Test Cases (Expected to Fail)', () => {
  negativeCases.forEach(tc => {
    test(tc.id, async ({ page }) => {
      await page.goto(BASE_URL);

      const inputArea = page.locator('textarea');
      const outputDiv = page.locator('div.bg-slate-50.whitespace-pre-wrap');

      await inputArea.fill(tc.input);
      await page.waitForTimeout(3000);

      const actualOutput = (await outputDiv.textContent() || '').trim();

      // 🔴 INTENTIONAL FAILURE
      expect(actualOutput).toBe(tc.expected);
    });
  });
});
