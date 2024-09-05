import { test, expect } from '@playwright/test'
import { DevOpsHomePage } from './pages/DevOpsHomePage'
import { ContactPage } from './pages/ContactPage'

test('test', async ({ page }) => {
  await page.goto('https://slcdevopsdays.org/')
  await page.locator('#menu-main-menu').getByRole('link', { name: 'Contact' }).click()
  await page.getByPlaceholder('What is your first name?').click()
  await page.getByPlaceholder('What is your first name?').fill('Brett')
  await page.getByPlaceholder('And your last name?').fill('TestPalmer')
  await page.getByPlaceholder('What is your email address?').click()
  await page.getByPlaceholder('What is your email address?').fill('brettgpalmer+slcdevopsdaystest@gmail.com')
  await page.getByPlaceholder('What questions do you have?').click()
  await page.getByPlaceholder('What questions do you have?').fill('Test contact form')
  await page.getByRole('button', { name: 'Submit' }).click()
})

test('Contact Form Happy Path', async ({ page }) => {
  const devOpsHomePage = new DevOpsHomePage(page)
  await devOpsHomePage.goto()

  const contactPage = new ContactPage(page)
  await contactPage.goto()
  await contactPage.fillOutFirstName()
  await contactPage.fillOutLastName()
})
