import { test as base } from '@playwright/test'
import { Pages } from './pages/pages'


type Fixtures = {
    auth: any,
    sauce: Pages,
}

export const test = base.extend<Fixtures>({
    auth: async ({ page }, use, workerInfo) => {
        const BASE_URL = workerInfo.project.use.baseURL ?? "not set in project"
        const cookie = {
            name: 'session-username',
            value: 'standard_user',
            url: BASE_URL,
        }

        await page.goto(BASE_URL)
        await page.context().addCookies([cookie])
        await use({ page })
    },
    sauce: async ({ page }, use) => {
        const pages = new Pages(page)
        await use(pages)
    }
})

export { expect } from '@playwright/test'
