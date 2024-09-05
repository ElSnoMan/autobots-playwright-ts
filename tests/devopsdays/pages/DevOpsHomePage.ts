import { expect, type Locator, type Page } from '@playwright/test'


export class DevOpsHomePage {
  readonly page: Page
  readonly HomeLink: Locator
  readonly SubscriberMessage: Locator
  readonly SubscriberInvalidEmailMessage: Locator


  constructor(page: Page) {
    this.page = page
    this.HomeLink = page.locator('text=Home')
    this.SubscriberMessage = page.locator('#gform_confirmation_message_3').first()
    this.SubscriberInvalidEmailMessage = page.locator('#validation_message_3_1')
  }


  async goto() {
    await this.page.goto('https://slcdevopsdays.org/')
  }

  async assertSubscriberMessage(expectedMessage: string) {
    await expect(this.SubscriberMessage).toContainText(expectedMessage)
  }

  async assertSubscribeInvalidEmailMessage(expectedMessage: string) {
    await expect(this.SubscriberInvalidEmailMessage).toContainText(expectedMessage)
  }
}
