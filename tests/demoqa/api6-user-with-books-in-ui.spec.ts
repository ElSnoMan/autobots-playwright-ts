/*
Use everything we've learned so far to create a new user with books in the API,
bypass the login with our auth fixture,
and then check that the user has the books we added to them
    1. Update our auth fixture to use the user and token objects (see fixtures6.ts)
    2. Create our new test combining everything
    3. Run the test in Trace Viewer mode to see the result!

    * There is more you can create and refactor,
    * but now you can easily control the data and environment to test different scenarios!
*/

import { test, expect } from './fixtures6'
import * as bookstore from './services/bookstore'

test('user with books can see them in their profile', async ({ auth }) => {
    const { page, user, token } = auth

    // 1. We already have the user, so just add books to them
    const books = await bookstore.getAllBooks()
    await bookstore.addBooksToUserById(user.userID, token.token, books)

    // 2. Go to their profile page
    await page.goto('/profile')

    // 3. Check that it's not empty since they should have all 8 books
    await expect(page.getByRole('gridcell', { name: 'Git Pocket Guide' })).toBeVisible()

    // Add other assertions or test different scenarios!
})
