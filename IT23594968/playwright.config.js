// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: false,   // Easier to read reports for assignments
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,             // Run sequentially

  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: false,      // Show browser (important for evidence)
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
