import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.swifttranslator.com/';

const positiveTestCases = [
  { id: 'TC_01', input: 'exam eka kavadhdha thiyenne?', expected: 'exam එක කවද්ද තියෙන්නෙ?' },
  { id: 'TC_02', input: 'mama exam eka sadhahaa vaeda karanavaa', expected: 'මම exam එක සදහා වැඩ කරනවා' },
  { id: 'TC_03', input: 'exam hall ekata kalin enna', expected: 'exam hall එකට කලින් එන්න' },
  { id: 'TC_04', input: 'mata exam eka liyanna bae', expected: 'මට exam එක ලියන්න බැ' },
  { id: 'TC_05', input: 'api exam results balamu passe', expected: 'අපි exam results බලමු පස්සෙ' },
  { id: 'TC_06', input: 'mata exam eka nisaa baya hithenavaa', expected: 'මට exam එක නිසා බය හිතෙනවා' },
  { id: 'TC_07', input: 'exam timetable eka LMS ekee dhaala thiyenavaa.', expected: 'exam timetable එක LMS එකේ දාල තියෙනවා.' },
  { id: 'TC_08', input: 'exam notes tika evanna puLuvandha?', expected: 'exam notes ටික එවන්න පුළුවන්ද?' },
  { id: 'TC_09', input: 'mama last exam ekata attend kaLaa.', expected: 'මම last exam එකට attend කළා.' },
  { id: 'TC_10', input: 'api exam eka sadhahaa group study karamu.', expected: 'අපි exam එක සදහා group study කරමු.' },
  { id: 'TC_11', input: 'api trip ekak plan karanavaa.', expected: 'අපි trip එකක් plan කරනවා.' },
  { id: 'TC_12', input: 'api Kandy yanna hadhannee.', expected: 'අපි Kandy යන්න හදන්නේ.' },
  { id: 'TC_13', input: 'trip ekata bags pack karanna onee.', expected: 'trip එකට bags pack කරන්න ඔනේ.' },
  { id: 'TC_14', input: 'api hotel ekak online book kaLaa.', expected: 'අපි hotel එකක් online book කළා.' },
  { id: 'TC_15', input: 'traffic nisaa trip eka late vunaa', expected: 'traffic නිසා trip එක late වුනා' },
  { id: 'TC_16', input: 'api trip ekata kavadhdha yanne?', expected: 'අපි trip එකට කවද්ද යන්නෙ?' },
  { id: 'TC_17', input: 'api yaluvo okkoma ekka yamu.', expected: 'අපි යලුවො ඔක්කොම එක්ක යමු.' },
  { id: 'TC_18', input: 'trip photos WhatsApp karanna.', expected: 'trip photos WhatsApp කරන්න.' },
  { id: 'TC_19', input: 'trip eka ivara vunaata passe api gedhara enavaa.', expected: 'trip එක ඉවර වුනාට පස්සෙ අපි ගෙදර එනවා.' },
  { id: 'TC_20', input: 'trip eka hari lassanayi.', expected: 'trip එක හරි ලස්සනයි.' },
  { id: 'TC_21', input: 'mama sports miit eka sadhahaa select vunaa.', expected: 'මම sports මීට් එක සදහා select වුනා.' },
  { id: 'TC_22', input: 'api sports practice kalin patan gannavaa.', expected: 'අපි sports practice කලින් පටන් ගන්නවා.' },
  { id: 'TC_23', input: 'sports miit ekeedhi hariyata karanna.', expected: 'sports මීට් එකේදි හරියට කරන්න.' },
  { id: 'TC_24', input: 'api sports miit eka dhinuvaa.', expected: 'අපි sports මීට් එක දිනුවා.' },
];

test.describe('Positive Functional Test Cases', () => {
  // REMOVED 'serial' mode. 
  // This ensures that if TC_01 fails, TC_02 will still try to run.
  
  positiveTestCases.forEach(tc => {
    test(`${tc.id}: ${tc.input}`, async ({ page }) => {
      // 1. Navigate
      await page.goto(BASE_URL);

      const inputArea = page.locator('textarea');
      const outputDiv = page.locator('div.bg-slate-50.whitespace-pre-wrap');

      // 2. Type simulation
      // Using a small delay to simulate human typing
      await inputArea.pressSequentially(tc.input, { delay: 50 });

      // 3. FORCE TRIGGER (Crucial Step)
      // We type a Space and then Backspace. 
      // This forces the React/JS engine to detect an "Input Event" and start the API call.
      await inputArea.press('Space');
      await page.waitForTimeout(200); // tiny pause
      await inputArea.press('Backspace');

      // 4. Manual Event Dispatch (Backup Trigger)
      // If the space trick doesn't work, this forces the browser to say "Hey, input changed!"
      await inputArea.dispatchEvent('input');

      // 5. Smart Wait
      // Wait for the output to NOT be empty before checking the text.
      // This solves the timing issue where it checked too early.
      await expect(outputDiv).not.toBeEmpty({ timeout: 15000 });

      // 6. Final Assertion
      await expect(outputDiv).toHaveText(tc.expected);
    });
  });
});
