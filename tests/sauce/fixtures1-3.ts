import { test as base } from '@playwright/test'


type Fixtures = {
    auth: any,
}

// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<Fixtures>({
    // page => builtin page fixture from Playwright
    // use => builtin function from Playwright to use or "pass" the fixture to the test
    // workerInfo => builtin fixture from Playwright to get info from playwright.config.ts (and more)
    auth: async ({ page }, use, workerInfo) => {
        // 1. Set the cookie to auth before each test
        const BASE_URL = workerInfo.project.use.baseURL ?? "not set in project"
        const cookie = {
            name: 'session-username',
            value: 'standard_user',
            url: BASE_URL,
        }

        await page.goto(BASE_URL)
        await page.context().addCookies([cookie])

        // 2. Use the fixture in the test
        await use({ page })
    },
})

// Also export expect so we can import test and expect from this file
export { expect } from '@playwright/test'
