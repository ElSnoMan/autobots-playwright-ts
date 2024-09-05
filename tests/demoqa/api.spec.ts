/*
Setup a test to create a new user
    1. Add demoqa project in playwright.config.ts
    2. In Plawyright Extension, set the Project to "demoqa" 🎮
    3. Use the demoqa.com/swagger file to understand the endpoint 📚
    4. Write the test to create a new user 📝
    5. What happens when you run the same test again? 🤔
*/

import { test, expect } from '@playwright/test'

const ACCOUNT = '/Account/v1'

test('create new user', async ({ request }) => {
    const payload = { userName: 'carlos', password: 'P@55w0rd123' }
    const response = await request.post(`${ACCOUNT}/User`, { data: payload })
    expect(response).toBeOK()

    const user = await response.json()
    expect(user).toHaveProperty('userID')
    expect(user).toHaveProperty('username', payload.userName)
    expect(user).toHaveProperty('books', [])
})
