/*
Make an interface and service functions
    1. Create an interface for the credential object
    2. Create a function to create a new user, notice how we import request now too
    3. Create a function to generate a token for a user
    4. Create a function to create an authorized user, combining the two functions
    5. Update the tests to use the new functions!
    6. Oh, and try logging in with your newly created user in the bookstore 📚
*/

import { test, expect, request } from '@playwright/test'

const ACCOUNT = '/Account/v1'

interface Credential {
    userName: string
    password: string
}

async function createUser(credential: Credential) {
    const api = await request.newContext()
    const response = await api.post(`${ACCOUNT}/User`, { data: credential })
    expect(response).toBeOK()
    return await response.json()
}

async function generateToken(credential: Credential) {
    const api = await request.newContext()
    const response = await api.post(`${ACCOUNT}/GenerateToken`, { data: credential })
    expect(response).toBeOK()
    return await response.json()
}

async function createAuthorizedUser(credential: Credential) {
    const user = await createUser(credential)
    const token = await generateToken(credential)
    return { user: user, token: token }
}

test('create unauthorized user', async () => {
    const credential = {
        userName: 'carlos',
        password: 'P@55w0rd123'
    }
    const user = await createUser(credential)
    expect(user).toHaveProperty('userID')
    expect(user).toHaveProperty('username', credential.userName)
    expect(user).toHaveProperty('books', [])
})

test('create authorized user', async () => {
    const credential = {
        userName: 'carlos',
        password: 'P@55w0rd123'
    }
    const { user, token } = await createAuthorizedUser(credential)
    expect(token).toEqual(expect.objectContaining(
        {
            expires: expect.any(String),
            token: expect.any(String),
            result: 'User authorized successfully.',
            status: 'Success'
        }
    ))
})
