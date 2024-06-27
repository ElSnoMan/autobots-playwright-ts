/*
Refactor the checkout flow into a CheckoutPage Page Object
    1. Create CheckoutPage in ./pages/checkout.ts 📄
    2. Refactor the steps into the CheckoutPage 🛒
    3. Create a CheckoutInfo data model in `./pages/checkout.ts` 📄
    4. Use CheckoutPage in the test from ./pages/checkout.ts 💰
*/

import { test, expect } from './fixtures1-3'
import { CartPage } from './pages/cart'
import { CheckoutPage, CheckoutInfo } from './pages/checkout'


test('Checkout', async ({ auth, page }) => {
    // 1. Already authed with auth fixture, so go to necessary page
    await page.goto('/inventory.html')

    // 2. Add items to the cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    const cart = await new CartPage(page).goto()

    // 3. Start checkout
    await cart.checkout()
    const checkout = new CheckoutPage(page)
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
