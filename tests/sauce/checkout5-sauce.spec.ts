/*
Group pages into a Pages object
    1. Create a Pages object in ./pages/pages.ts📄
    2. Create a sauce fixture (see ./fixtures5.ts) 🔧
    3. Use the pages fixture in the test 🧪
*/

import { test, expect } from './fixtures5'
import { CheckoutInfo } from './pages/checkout'


test('Checkout', async ({ auth, page, sauce }) => {
    // Add items to the cart
    await page.goto('/inventory.html')
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

    // Start checkout
    await sauce.cart.goto()
    await sauce.cart.checkout()
    await sauce.checkout.fillYourInfo('Spongebob', 'Squarepants', '84555')
    await sauce.checkout.continueButton.click()

    // Validate Checkout info is correct
    const info: CheckoutInfo = {
        itemTotal: '$39.98',
        taxTotal: '$3.20',
        // grandTotal: '$43.18',
        grandTotal: '$100.00',
        paymentInfo: 'SauceCard #31337',
        shippingInfo: 'Free Pony Express Delivery!'
    }
    await sauce.checkout.validateOverview(info)

    // Finish checkout
    await sauce.checkout.finishButton.click()
    await expect(sauce.checkout.completeHeader).toBeVisible()
})
