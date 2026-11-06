import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

for (const name of ['USER_EMAIL', 'USER_PASSWORD']) {
    if (!process.env[name]) {
        throw new Error(`Missing required environment variable: ${name}`)
    }
}

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['html', { open: 'never' }],
        ['list'],
    ],
    timeout: 60_000,
    expect: {
        timeout: 15_000,
    },
    use: {
        actionTimeout: 15_000,
        baseURL: 'https://sandbox-app.brighthr.com',
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
})
