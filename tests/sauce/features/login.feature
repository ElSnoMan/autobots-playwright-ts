Feature: Login

    SauceDemo doesn't have a "Guest" option, so users have to login.

    Acceptance Criteria:
    - Users can login with valid credentials
    - Users can't login with invalid credentials

    Questions:
    - What happens when a user tries to login with an invalid username?

    Risks:
    - The login page might not be accessible

    Test Strategy:
    - Cross Browser Testing

    Scenario: Login with valid credentials
        Given I am on the login page
        When I login with valid credentials
        Then I should be on the Products page

    Scenario: Example
        Given some state
        When some action
        Then some outcome

    Scenario Outline: Login with invalid credentials
        Given I am on the login page
        When I login with invalid credentials <username> <password>
        Then I should see an error message

        Examples:
            | username | password |
            | locked_out_user    | secret_sauce    |
            | error_user    | secret_sauce    |
