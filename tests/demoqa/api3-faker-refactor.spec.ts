/*
Generate fake data with faker.js to avoid "already exists" errors
    1. Install faker ($ bun add @faker-js/faker)
    2. Create a /services folder and a account.ts file
    3. Move our interface and functions to the account.ts file
    4. Create a function that uses faker to generate a random credential
    5. Use the functions from account.ts in the tests!

    * You get the same Test Run Report ($ npx playwright show-report)
    * You can also see API tests in the Trace Viewer! Turn it on in the extension
    * You can keep these API tests separate from the UI tests since they're valuable!
*/

import { test, expect } from '@playwright/test'
import * as account from './services/account'

test('create unauthorized user', async () => {
    const credential = account.generateRandomCredential()
    const user = await account.createUser(credential)
    console.log(credential)
    expect(user).toHaveProperty('userID')
    expect(user).toHaveProperty('username', credential.userName)
    expect(user).toHaveProperty('books', [])
})

test('create authorized user', async () => {
    const credential = account.generateRandomCredential()
    const { user, token } = await account.createAuthorizedUser(credential)
    console.log(credential)
    expect(token).toEqual(expect.objectContaining(
        {
            expires: expect.any(String),
            token: expect.any(String),
            result: 'User authorized successfully.',
            status: 'Success'
        }
    ))
})
