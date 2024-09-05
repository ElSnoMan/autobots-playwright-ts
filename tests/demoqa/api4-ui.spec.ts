/*
Use the account service to create an authorized user and login with it in the UI
    1. Create a fixtures.ts file in the tests/demoqa folder
    2. Following the same patterns from Chapter 2, set the cookies using the {user, token} from the account service
    3. Use the auth fixture in this test to bypass login and go directly to the profile page
    4. Run the test in Trace Viewer mode to see how the steps are done!
*/

import { test, expect } from './fixtures4'

test('login seam with create authorized user', async ({ auth, page }) => {
    await page.goto('/profile')
    const logoutButton = page.getByRole('button', { name: 'Log out' })
    await logoutButton.focus()  // waits for element to be actionable
    expect(logoutButton).toBeVisible()
})
