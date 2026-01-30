import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';  // Replace with your web app URL

const negativeCases = [
  { 
    id: 'Neg_Fun_0001', 
    input: '', 
    expected: 'Please enter text to translate.', 
    description: 'Empty input should trigger validation message.' 
  },
  { 
    id: 'Neg_Fun_0002', 
    input: '!!!???', 
    expected: 'Invalid input. Please enter valid words.', 
    description: 'Symbols-only input should be rejected.' 
  },
  { 
    id: 'Neg_Fun_0003', 
    input: 'mama iPhone ekak USA valin genavaa', 
    expected: 'Brand and country names should remain unchanged.', 
    description: 'System should not translate known brands/countries.' 
  },
  { 
    id: 'Neg_Fun_0004', 
    input: 'අද අද අද අද', 
    expected: 'Unclear input. Please rephrase sentence.', 
    description: 'Repeated meaningless words should trigger warning.' 
  },
  { 
    id: 'Neg_Fun_0005', 
    input: 'එකකොහොමදමේක', 
    expected: 'Unable to detect word boundaries.', 
    description: 'Fully joined words should fail translation.' 
  },
  { 
    id: 'Neg_Fun_0006', 
    input: 'run ran running will run', 
    expected: 'Sentence structure unclear.', 
    description: 'Mixed random English verbs should not translate.' 
  },
  { 
    id: 'Neg_Fun_0007', 
    input: 'ado bn *& 56 machan sira ela seen ekak', 
    expected: 'Slang-heavy input. Translation may be inaccurate.', 
    description: 'Excessive slang and symbols not handled.' 
  },
  { 
    id: 'Neg_Fun_0008', 
    input: 'mama iiyee yanava heta giyaa', 
    expected: 'Conflicting tense detected.', 
    description: 'Mixed past and present tense not detected correctly.' 
  },
  { 
    id: 'Neg_Fun_0009', 
    input: 'me campus# bus$', 
    expected: 'Special characters detected. Remove symbols.', 
    description: 'Special character handling missing.' 
  },
  { 
    id: 'Neg_Fun_0010', 
    input: 'こんにちは元気ですか', 
    expected: 'Unsupported language detected.', 
    description: 'Non-Singlish language not handled.' 
  },
];

// Functional negative test cases
test.describe('Negative Functional Test Cases', () => {
  negativeCases.forEach(tc => {
    test(tc.id, async ({ page }) => {
      await page.goto(BASE_URL);
      await page.fill('#inputField', tc.input);          // Replace with your input selector
      await page.click('#translateBtn');                  // Replace with your translate button selector
      const output = await page.textContent('#output');  // Replace with your output selector
      expect(output.trim()).toBe(tc.expected);
    });
  });
});

// UI negative test case
test.describe('Negative UI Test Case', () => {
  test('Neg_UI_0001 - Input field not clearing', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#inputField', 'oyaata kohomadha?');  // Example input
    await page.click('#clearBtn');                         // Replace with your Clear button selector
    const fieldValue = await page.inputValue('#inputField');
    expect(fieldValue).toBe('');                           // Expect input to be cleared
  });
});
