import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000'; // change if your app runs on another port

const negativeTestCases = [
  {
    id: 'TC_25',
    input: 'election dhinaye @vote dhenna oone',
    expected: 'election දිනයේ @vote දෙන්න ඕනේ'
  },
  {
    id: 'TC_26',
    input: 'election resu1ts adha enavadha?',
    expected: 'election රෙසු1ts අද එනවද?'
  },
  {
    id: 'TC_27',
    input: 'candidate ### meeting eka adha',
    expected: 'candidate ### meeting එක අද'
  },
  {
    id: 'TC_28',
    input: 'cricket match eka 2day @stadium eke',
    expected: 'cricket match එක 2day @stadium එකේ'
  },
  {
    id: 'TC_29',
    input: 'player eeka h@riyata play karaa',
    expected: 'player ඒක හ්@රියට play කරා'
  },
  {
    id: 'TC_30',
    input: 'match eka 7.30!!! patan gannavaa',
    expected: 'match එක 7.30!!! පටන් ගන්නවා'
  },
  {
    id: 'TC_31',
    input: 'umpire decision eka h@ri dha?',
    expected: 'umpire decision එක හ්@රි ද?'
  },
  {
    id: 'TC_32',
    input: 'me phone eke pr!ce kiiyadha',
    expected: 'මෙ phone eke ප්‍ර!cඑ කීයද'
  },
  {
    id: 'TC_33',
    input: 'phone warr4nty thiyenavadha',
    expected: 'phone wඅර්‍ර4න්ට්ය් තියෙනවද'
  },
  {
    id: 'TC_34',
    input: 'me model 1ke stock thiyenavadha',
    expected: 'මෙ model 1කෙ stock තියෙනවද'
  }
];

test.describe('Negative Functional Test Cases – Robustness Validation', () => {
  for (const tc of negativeTestCases) {
    test(`${tc.id} – Invalid symbols and numbers handling`, async ({ page }) => {
      await page.goto(BASE_URL);

      await page.fill('textarea', tc.input);
      await page.click('button'); // update selector if needed

      const output = page.locator('.output');

      // Negative expectation: system FAILS to normalize invalid input
      await expect(output).toHaveText(tc.expected);
    });
  }
});
