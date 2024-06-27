/*
Start refactoring action flows into Page Objects
    1. Create CartPage in ./pages/cart.ts 📄
    2. Refactor the steps into the CartPage 🛒
    3. Use CartPage in the test from ./pages/cart.ts 🛒
*/

import { test, expect } from './fixtures1-3'
import { CartPage } from './pages/cart'


test('Checkout', async ({ auth, page }) => {
    // 1. Already authed with auth fixture, so go to necessary page
    await page.goto('/inventory.html')

    // 2. Add items to the cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    const cart = await new CartPage(page).goto()

    // 3. Start checkout
    await cart.checkout()
    await page.locator('[data-test="firstName"]').fill('Spongebob');
    await page.locator('[data-test="lastName"]').fill('Squarepants');
    await page.locator('[data-test="postalCode"]').fill('84555');
    await page.locator('[data-test="continue"]').click();

    // 4. Finish checkout
    await expect(page.locator('[data-test="payment-info-value"]')).toContainText('SauceCard #31337');
    await expect(page.locator('[data-test="shipping-info-value"]')).toContainText('Free Pony Express Delivery!');
    await expect(page.locator('[data-test="subtotal-label"]')).toContainText('Item total: $39.98');
    await expect(page.locator('[data-test="tax-label"]')).toContainText('Tax: $3.20');
    await expect(page.locator('[data-test="total-label"]')).toContainText('Total: $43.18');
    await page.locator('[data-test="finish"]').click();

    // 5. Assert checkout complete
    await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
});
