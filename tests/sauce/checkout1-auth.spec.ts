/*
Use fixtures to create a SEAM for authentication and page navigation
    1. Add saucedemo project in playwright.config.ts 🥫
    2. Create auth fixture in ./fixtures1-3.ts 🛠
    3. Use test, expect, and auth fixture from ./fixtures1-3.ts 👀
    4. In Plawyright Extension, set the Projects to "saucedemo" 🎮
*/

import { test, expect } from './fixtures1-3'


test("try this seam!", async ({ auth, page }) => {
    page.goto("/checkout-complete.html")
    await expect(page.locator('[data-test="complete-header"]')).toBeVisible()
})


test('Checkout', async ({ auth, page }) => {
    // 1. Already authed with auth fixture, so go to necessary page
    await page.goto('/inventory.html')

    // 2. Add items to the cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="title"]')).toContainText('Your Cart');

    // 3. Start checkout
    await page.locator('[data-test="checkout"]').click();
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
})
