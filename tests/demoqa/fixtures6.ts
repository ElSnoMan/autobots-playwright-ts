import { test as base, Page } from '@playwright/test'
import * as account from './services/account'


type Fixtures = {
    auth: {
        page: Page,
        user: any,
        token: any,
    }
}

export const test = base.extend<Fixtures>({
    auth: async ({ page }, use, workerInfo) => {
        const baseURL = workerInfo.project.use.baseURL ?? "not set in project"
        const credential = account.generateRandomCredential()
        const { user, token } = await account.createAuthorizedUser(credential)
        console.log(credential)

        await page.goto('/login')
        await page.context().addCookies([
            { url: baseURL, name: 'userName', value: credential.userName },
            { url: baseURL, name: 'userID', value: user.userID },
            { url: baseURL, name: 'token', value: token.token },
            { url: baseURL, name: 'expires', value: token.expires },
        ])
        await use({ page, user, token })
    },
})

export { expect } from '@playwright/test'
