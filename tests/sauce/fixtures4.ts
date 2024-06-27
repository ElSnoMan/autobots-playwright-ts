import { test as base } from '@playwright/test'
import { CartPage } from './pages/cart'
import { CheckoutPage } from './pages/checkout'

// Specifying the types of your fixtures allows for better intellisense, auto-complete, and type checking
type Fixtures = {
    auth: any,
    cart: CartPage,
    checkout: CheckoutPage,
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
    // CartPage is now a fixture
    cart: async ({ page }, use) => {
        const cart = new CartPage(page)
        await use(cart)
    },
    // CheckoutPage is now a fixture
    checkout: async ({ page }, use) => {
        const checkout = new CheckoutPage(page)
        await use(checkout)
    },
})

export { expect } from '@playwright/test'
