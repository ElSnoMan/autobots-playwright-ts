import { type Page } from '@playwright/test'
import { CartPage } from './cart'
import { CheckoutPage } from './checkout'


// Wrapper to hold our page objects
export class Pages {
    constructor(readonly page: Page) { }

    get cart() { return new CartPage(this.page) }
    get checkout() { return new CheckoutPage(this.page) }
}
