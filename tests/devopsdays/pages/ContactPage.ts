import { faker } from '@faker-js/faker'
import { expect, type Locator, type Page } from '@playwright/test'


export class ContactPage {
  readonly page: Page
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly emailInput: Locator
  readonly messageInput: Locator
  readonly submitButton: Locator
  readonly confirmationMessage: Locator



  constructor(page: Page) {
    this.page = page
    // this.firstNameInput = page.locator('input[placeholder="What is your first name?"]')
    this.firstNameInput = page.getByPlaceholder('What is your first name?')
    //this.firstNameInput = page.getByText('What is your first name?')
    //this.firstNameInput = page.getByRole('textbox', {name: 'What is your first name?'} )
    this.lastNameInput = page.locator('input[placeholder="And your last name?"]')
    this.emailInput = page.locator('input[placeholder="What is your email address?"]')
    this.messageInput = page.locator('input[placeholder="What questions do you have?"]')
    this.submitButton = page.getByText('Submit')
    this.confirmationMessage = page.locator('')
  }

  async fillOutFirstName() {
    try {
      const firstName = faker.person.firstName()
      console.log(firstName)
      const lastName = faker.person.lastName()
      console.log(lastName)
      await this.firstNameInput.fill(firstName)
    } catch (error) {
      console.error('Error filling the input field:', error)
    }
  }

  async fillOutLastName() {
    const lastName = faker.person.lastName()
    console.log(lastName)
    await this.lastNameInput.fill(lastName)
  }

  async fillOutEmail() {
    const email = faker.internet.email()
    await this.emailInput.fill(email)
  }
  async fillOutMessage() {
    const message = 'this is a test'
    await this.messageInput.locator(message)
  }

  async submitButton() {

  }

  async assertContactFormConfirmationMessage(expectedMessage: string) {
    await expect(this.confirmationMessage).toContainText(expectedMessage)
  }
}
