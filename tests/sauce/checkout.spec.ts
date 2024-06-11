import { test, expect } from '@playwright/test';


// Example used to show Playwright's VS Code extension and Record a Test feature

test('Checkout', async ({ page }) => {
  // 1. Login
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

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
});
