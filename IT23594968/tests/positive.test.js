import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.swifttranslator.com/';

const positiveCases = [
  { id: 'Pos_Fun_0001', input: 'mama kaempas ekata yana gaman inne', expected: 'මම කැම්පස් එකට යන ගමන් ඉන්නේ' },
  { id: 'Pos_Fun_0002', input: 'mata hari ma badagini', expected: 'මට හරි ම බඩගිනි' },
  { id: 'Pos_Fun_0003', input: 'api canteen ekata yamu', expected: 'අපි canteen එකට යමු' },
  { id: 'Pos_Fun_0004', input: 'oya dhaen free dha?', expected: 'ඔය දැන් free ද?' },
  { id: 'Pos_Fun_0005', input: 'poddak stop karanna puluvandha?', expected: 'පොඩ්ඩක් stop කරන්න පුලුවන්ද?' },
  { id: 'Pos_Fun_0006', input: 'poddak enna baeridha ithin', expected: 'පොඩ්ඩක් එන්න බැරිද ඉතින්' },
  { id: 'Pos_Fun_0007', input: 'api heta film ekak balamu', expected: 'අපි හෙට film එකක් බලමු' },
  { id: 'Pos_Fun_0008', input: 'mata eka karanna baehae', expected: 'මට එක කරන්න බැහැ' },
  { id: 'Pos_Fun_0009', input: 'samaavenna mama godak parakku unaa', expected: 'සමාවෙන්න මම ගොඩක් පරක්කු උනා' },
  { id: 'Pos_Fun_0010', input: 'lecture eka hari ma boring', expected: 'lecture එක හරි ම boring' },
  { id: 'Pos_Fun_0011', input: 'oya kohe idhan dha enne?', expected: 'ඔය කොහෙ ඉදන් ද එන්නෙ?' },
  { id: 'Pos_Fun_0012', input: 'api 4.30 ta library eka laga hamba vemu', expected: 'අපි 4.30 ට library එක ලග හම්බ වෙමු' },
  { id: 'Pos_Fun_0013', input: 'oya enne kavath dha?', expected: 'ඔය එන්නෙ කවත් ද?' },
  { id: 'Pos_Fun_0014', input: 'shaa hari ma lassanayi meka', expected: 'ශා හරි ම ලස්සනයි මෙක' },
  { id: 'Pos_Fun_0015', input: 'Mama dhaen liyanna gannavaa', expected: 'මම දැන් ලියන්න ගන්නවා' },
  { id: 'Pos_Fun_0016', input: 'iiyee lecture eka miss unaa', expected: 'ඊයේ lecture එක miss උනා' },
  { id: 'Pos_Fun_0017', input: 'mata poddak mathak karala dhenna', expected: 'මට පොඩ්ඩක් මතක් කරල දෙන්න' },
  { id: 'Pos_Fun_0018', input: 'magee athee rupiyal 500yi thiyenne', expected: 'මගේ අතේ රුපියල් 500යි තියෙන්නෙ' },
  { id: 'Pos_Fun_0019', input: 'adha hari ma mahansi', expected: 'අද හරි ම මහන්සි' },
  { id: 'Pos_Fun_0020', input: 'meeting eka ivara unaama call karannam', expected: 'meeting එක ඉවර උනාම call කරන්නම්' },
  { id: 'Pos_Fun_0021', input: 'api weekend eke anivaaren gedhara yamu', expected: 'අපි weekend eke අනිවාරෙන් ගෙදර යමු' },
  { id: 'Pos_Fun_0022', input: 'mata murukku 250g oonee', expected: 'මට මුරුක්කු 250g ඕනේ' },
  { id: 'Pos_Fun_0023', input: 'oyaa eeka kalee kohomadha?', expected: 'ඔයා ඒක කලේ කොහොමද?' },
  { id: 'Pos_Fun_0024', input: 'suba dhavasak oyaata!', expected: 'සුබ දවසක් ඔයාට!' }
];

test.describe('Positive Functional Test Cases', () => {
  positiveCases.forEach(tc => {
    test(tc.id, async ({ page }) => {
      await page.goto(BASE_URL);
      const inputArea = page.locator('textarea'); 
      const outputDiv = page.locator('div.bg-slate-50.whitespace-pre-wrap');

      await inputArea.fill(tc.input);
      
      // Dynamic wait: Wait for the div to have content before checking value
      await expect(outputDiv).not.toBeEmpty({ timeout: 10000 }); 

      const actualOutput = (await outputDiv.textContent() || '').trim();
      expect(actualOutput).toBe(tc.expected);
    });
  });
});