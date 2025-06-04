import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'dot',
  use: {
    baseURL: 'https://petstore.swagger.io/v2',
    extraHTTPHeaders: {
      accept: 'application/json',
      'content-type': 'application/json',
      api_key: process.env.API_KEY || '',
    },
  },
  projects: [
    {
      name: 'pet-online-store',
      testMatch: '**/*petstore.spec.ts',
    },
  ],
});

