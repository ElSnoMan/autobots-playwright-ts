// The 'export' keyword is used to make the function available to other files

import { faker } from '@faker-js/faker'
import { expect, request } from '@playwright/test'

const ACCOUNT = '/Account/v1'

export interface Credential {
    userName: string
    password: string
}

export function generateRandomCredential(): Credential {
    return {
        userName: faker.internet.userName(),
        password: 'P@55w0rd123'
    }
}

export async function createUser(credential: Credential) {
    const api = await request.newContext()
    const response = await api.post(`${ACCOUNT}/User`, { data: credential })
    expect(response).toBeOK()
    return await response.json()
}

export async function generateToken(credential: Credential) {
    const api = await request.newContext()
    const response = await api.post(`${ACCOUNT}/GenerateToken`, { data: credential })
    expect(response).toBeOK()
    return await response.json()
}

export async function createAuthorizedUser(credential: Credential) {
    const user = await createUser(credential)
    const token = await generateToken(credential)
    return { user: user, token: token }
}

export async function getUserById(userId: string, token: string) {
    const api = await request.newContext()
    const response = await api.get(`${ACCOUNT}/User/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    expect(response).toBeOK()
    return await response.json()
}
