import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run server',
    port: 3000,
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    // 会社 PC は拡張機能オフで起動できない
    launchOptions: {
      ignoreDefaultArgs: ['--disable-extensions'],
      args: [
        '--disable-gpu',
        '--disable-software-rasterizer',
        '--disable-dev-shm-usage',
        '--no-sandbox',
      ],
    },
  },
  testDir: '.',
  testMatch: /(.+\.)?spec\.[jt]s/,
  workers: 1,
  maxFailures: 1,
});
