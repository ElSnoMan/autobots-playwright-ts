import { expect, type Locator, type Page } from '@playwright/test'


// Model to represent the checkout information
export type CheckoutInfo = {
    itemTotal: string,
    taxTotal: string,
    grandTotal: string,
    paymentInfo: string,
    shippingInfo: string,
}


export class CheckoutPage {
    get continueButton() { return this.page.locator('[data-test="continue"]') }
    get finishButton() { return this.page.locator('[data-test="finish"]') }
    get completeHeader() { return this.page.locator('[data-test="complete-header"]') }

    constructor(readonly page: Page) {
    }

    // Example seam to navigate to specific steps in the checkout flow
    async visit(step: 'step-one' | 'step-two' | 'complete') {
        await this.page.goto(`/checkout-${step}.html`)
        return this
    }

    async fillYourInfo(firstName: string, lastName: string, postalCode: string) {
        await this.page.locator('[data-test="firstName"]').fill(firstName)
        await this.page.locator('[data-test="lastName"]').fill(lastName)
        await this.page.locator('[data-test="postalCode"]').fill(postalCode)
    }

    async validateOverview(checkoutInfo: CheckoutInfo) {
        await expect(this.page.locator('[data-test="payment-info-value"]')).toContainText(checkoutInfo.paymentInfo)
        await expect(this.page.locator('[data-test="shipping-info-value"]')).toContainText(checkoutInfo.shippingInfo)
        await expect(this.page.locator('[data-test="subtotal-label"]')).toContainText(checkoutInfo.itemTotal)
        await expect(this.page.locator('[data-test="tax-label"]')).toContainText(checkoutInfo.taxTotal)
        await expect(this.page.locator('[data-test="total-label"]')).toContainText(checkoutInfo.grandTotal)
    }
}
