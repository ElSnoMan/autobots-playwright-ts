/*
Refactor CartPage and CheckoutPage into fixtures
    1. See ./fixtures4.ts 👀
    2. Use the page fixtures in the test 📄
*/

import { test, expect } from './fixtures4'
import { CheckoutInfo } from './pages/checkout'


test('Checkout', async ({ auth, page, cart, checkout }) => {
    // 1. Already authed with auth fixture, so go to necessary page
    await page.goto('/inventory.html')

    // 2. Add items to the cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await cart.goto()

    // 3. Start checkout
    await cart.checkout()
    await checkout.fillYourInfo('Spongebob', 'Squarepants', '84555')
    await checkout.continueButton.click()

    // 4. Finish checkout
    const info: CheckoutInfo = {
        itemTotal: '$39.98',
        taxTotal: '$3.20',
        grandTotal: '$43.18',
        paymentInfo: 'SauceCard #31337',
        shippingInfo: 'Free Pony Express Delivery!'
    }
    await checkout.validateOverview(info)
    await checkout.finishButton.click()

    // 5. Assert checkout complete
    await expect(checkout.completeHeader).toBeVisible()
})
