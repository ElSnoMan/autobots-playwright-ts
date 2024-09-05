/*
Use the bookstore service to create an authorized user and give them some books
    1. Create a bookstore.ts file in the /services folder
    2. Create a function to get all books from the API
    3. Create a function to add a list of books to a user (requires a bearer token)
    4. Create a getUserById function in the account service (requires a bearer token)
    5. Write a test that creates a user, adds some books to the user, and then checks if the books are in the user's list
*/

import { test, expect } from '@playwright/test'
import * as account from './services/account'
import * as bookstore from './services/bookstore'

test('get all books', async () => {
    const books = await bookstore.getAllBooks()
    expect(books).toHaveLength(8)
})

test('add books to user', async () => {
    // 1. Create a new user
    const credential = account.generateRandomCredential()
    const { user, token } = await account.createAuthorizedUser(credential)
    console.log(credential)

    // 2. Get a list of all books in the bookstore
    const books = await bookstore.getAllBooks()

    // 3. Add all books to the user
    await bookstore.addBooksToUserById(user.userID, token.token, books)
    const userWithBooks = await account.getUserById(user.userID, token.token)

    // 4. Assert the new user has the books!
    expect(userWithBooks.username).toEqual(credential.userName)
    expect(userWithBooks.userId).toEqual(user.userID)
    expect(userWithBooks.books).toHaveLength(books.length)
})
