// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    headless: true,         // Change to false to see the browser
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
});
