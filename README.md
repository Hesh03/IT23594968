# Playwright Automation Assignment - IT3040 ITPM
**Name:** [Heshani munasinghe]
**Registration Number:** [IT23594968]
**Project Title:** Singlish to Sinhala Conversion Testing (SwiftTranslator)

## Project Overview
This repository contains the automation suite for testing the swifttranslator.com platform using Playwright. 
It covers 24 Positive cases, 10 Negative cases, and 1 UI testing scenario.

## Requirements
- Node.js installed
- Google Chrome browser

## How to setup and run tests
Install Project Dependencies: Run the following command to install the necessary Node modules listed in package.json:

Bash
npm install
Install Playwright Browsers: Run the following command to download the necessary browser binaries required by Playwright to run the tests:

Bash
npx playwright install
4. How to Run the Tests
You can run the tests using the following commands in the VS Code terminal.

Run All Tests (Headless Mode)
To run all tests in the background (fastest method) and get a summary in the terminal:

Bash
npx playwright test
Run Tests in Headed Mode (Visible Browser)
To watch the tests execute visually in a browser window, add the --headed flag.

1. Run Positive Functional Tests:
Bash
npx playwright test tests/positive.test.js --headed

3. Run Negative Functional Tests: (Note: These tests are expected to fail as they demonstrate current limitations in the application's error handling.)
Bash
npx playwright test tests/negative.test.js --headed

3. Run UI Tests: (Assuming your UI test file is named ui.test.js located in the tests folder)
Bash
npx playwright test tests/ui.test.js --headed

   
