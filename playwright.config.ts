import { defineConfig } from '@playwright/test'
import { env } from './env'

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'dot',
  use: {
    baseURL: 'https://petstore.swagger.io/v2',
    extraHTTPHeaders: {
      accept: 'application/json',
      'content-type': 'application/json',
      api_key: env.API_KEY,
    },
  },
  projects: [
    {
      name: 'data-setup',
      testMatch: '**/*-setup.spec.ts',
    },
    {
      name: 'get-pet-online-store',
      dependencies: ['data-setup'],
      testMatch: '**/*get-pet-petstore.spec.ts',
    },
    {
      name: 'create-pet-online-store',
      dependencies: ['data-setup'],
      testMatch: '**/*create-pet-petstore.spec.ts',
    },
    {
      name: 'update-pet-online-store',
      dependencies: ['data-setup'],
      testMatch: '**/*update-pet-petstore.spec.ts',
    },
  ],
})

