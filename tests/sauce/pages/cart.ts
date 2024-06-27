import { expect, type Locator, type Page } from '@playwright/test'


export class CartPage {
    private cartIcon: Locator
    get pageTitle() { return this.page.locator('[data-test="title"]') }

    constructor(readonly page: Page) {
        this.cartIcon = this.page.locator('[data-test="shopping-cart-link"]')
    }

    async goto() {
        await this.cartIcon.click()
        expect(this.pageTitle).toContainText('Your Cart')
        return this
    }

    async visit() {
        await this.page.goto("/cart.html")
        expect(this.pageTitle).toContainText('Your Cart')
        return this
    }

    async checkout() {
        await this.page.locator('[data-test="checkout"]').click()
    }
}
