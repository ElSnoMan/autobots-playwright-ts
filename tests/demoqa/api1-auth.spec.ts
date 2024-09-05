/*
Setup a test to authorize the newly created user
    1. Authorize new user with the /GenerateToken endpoint
    2. Use pattern matching to validate the response 🧐
    3. Observe how the requests are nearly identical 🤔
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

test('authorize new user', async ({ request }) => {
    const payload = { userName: 'carlos', password: 'P@55w0rd123' }
    const response = await request.post(`${ACCOUNT}/GenerateToken`, { data: payload })
    expect(response).toBeOK()

    const json = await response.json()
    expect(json).toEqual(expect.objectContaining(
        {
            expires: expect.any(String),
            token: expect.any(String),
            result: 'User authorized successfully.',
            status: 'Success'
        }
    ))
})
