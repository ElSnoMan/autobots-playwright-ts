# Autobots: Playwright with TypeScript

* [How to use this repo](#how-to-use-this-repo)
* [Requirements](#requirements)
* [Chapter 1: Start a QA Project from Scratch](#chapter-1-start-a-qa-project-from-scratch)
* [Chapter 2: Refactoring and Fixtures for Usability](#chapter-2-refactoring-to-page-objects-and-fixtures-for-usability)
* [Chapter 3: Create Data-Driven UI Tests with an API](#chapter-3-create-data-driven-ui-tests-with-an-api)

## How to use this repo

Each month we cover a different "chapter" as we progress to a robust Test Automation Framework.

To go through any chapter, or catch up on a session you missed, open the [Branches](https://github.com/ElSnoMan/autobots-playwright-ts/branches) page and click on the one you want to see!

Then take a look at the [README](/README.md) to see what to do.

> 💡 Any time you see a dollar sign, like `$ something`, that means to run that command in the Terminal!

## Requirements

* [bun.sh](https://bun.sh/) installed for typescript (free)
* [Playwright](https://playwright.dev/)

## Chapter 1: Start a QA Project from scratch

Takeaways

* Create a new TypeScript project with bun
* Setup VS Code to work with Playwright and TypeScript
* Break down an app so we can strategize how we iteravitely test and cover it
* Use Gherkin to define our features and scenarios
* Write our first Playwright tests and use their extensions and features to help out!

### Setup Workspace in VS Code

Extensions to install

* Playwright Test for VS Code
* ESLint
* Feature Syntax Highlight and Snippets (Cucumber/Gherkin)

Create the Workspace

1. Create a new directory/folder somewhere on your machine and then open it in VS Code
2. Then initialize the project using bun:

    `$ bun init`

> 💡 You should see some files and folders get created automatically!

### Setup Playwright Project

Now that we're rolling in VS Code, we can install Playwright and configure it.

1. `$ bun add playwright`
2. `$ bun add @playwright/test`
3. Add `@playwright/test` to the `tsconfig.json`

    ```json
        "types": [
      "bun-types", // add Bun global
      "@playwright/test"
    ]
    ```

4. Create a new `/tests` folder
5. Open the Playwright extension and click `Record Test`. You can use `https://saucedemo.com`
6. Start performing some actions and see how each action is recorded

> 💡 At this point, you're full on using Playwright! I recommend getting familiar with [their docs](https://playwright.dev/docs/codegen#record-a-new-test)

### BDD and Gherkin

We are using Gherkin to help us define features and scenarios we want to describe what we mean.
However, we are not going to be using Cucumber or any other BDD tool. BDD is great, but automation tools for it are not great in my opinion.

1. Under `/tests`, make a new `/sauce` folder
2. Under `/tests/sauce`, make a new `/features` folder

Now you're ready for the challenges!

### Ch1: Challenges

Get as far as you can with each challenge on your own, but if you need help, post any questions in the `#autobots` channel of our [QA Utah Slack Group](https://qap.dev/contact) and people will help!

#### Challenge 1: Break down the app into different areas or features

We will be using the [SwagLabs website](https://saucedemo.com), but this applies to any app.

1. Within `/tests/sauces/features`, create a `product.md` file
2. To start out, just use English and markdown to break down the app however it makes sense to you
3. This requires you to explore [SwagLabs](https://saucedemo.com), but that's exactly what we do in QA

Saying ***"test adding items to the cart"*** is much better than ***"test the whole app"***! You have to strategically organize and strategize how you do your testing since you don't have an infinite amount of time or resources.

> 🎯 Your goal is to break down SwagLabs into smaller pieces. It's common to break it down by areas and/or features.

Example

```markdown
# Features

* Login Page
* Products Page
    * View Products
    * Sort Products
    * Add item to cart
    ...
```

#### Challenge 2: Write Scenarios for one Feature

Pick one of the features you defined in your `products.md` file for this challenge.

1. Within `/tests/sauces/features`, create a `{name}.feature` file. For example, `login.feature`
2. Use Gherkin to describe the Feature and write Scenarios to cover it

🐼🥒 If you are new to writing Gherkin, checkout this [BDD 101 "How to"](https://automationpanda.com/2017/01/30/bdd-101-writing-good-gherkin/) article by the Automation Panda

> 🎯 Your goal is to describe the feature, provide simple acceptance criteria, and to write at least a couple scenarios to cover it.

#### Challenge 3: Write an automated test for one Scenario

Pick one of the scenarios you defined in your `.feature` file for this challenge.

1. Either create your own `{name}.spec.ts` file or record a new test
2. Create a test that covers your scenario!

> 🎯 Your goal is to create a test that covers your scenario. You can create as many tests as you want, but make sure you see them FAIL and PASS for the right reasons!

#### BONUS Challenge: Achieve 100% Product Coverage

For more advanced attendees, use everything you've learned up to this point to try and achieve 100% Product Coverage of SwagLabs!
Product Coverage (aka Test Coverage) means that you are testing everything that matters in an app or system. For this challenge:

* Finish the `product.md` file so it's ready to share
* Finish creating the `.feature` files with the features and scenarios
* Create all of the automated tests to cover your scenarios

> 💡 Many companies dream of getting 100% coverage of their apps, but few actually achieve that... can you?

## Chapter 2: Refactoring to Page Objects and Fixtures for Usability

In the previous chapter, we ended with our [checkout.spec.ts](tests/sauce/checkout.spec.ts) scripted test. In this chapter, we will be refactoring those steps into [Page Objects](https://playwright.dev/docs/pom) and [Fixtures](https://playwright.dev/docs/test-fixtures) that make it easier to use and maintain as our repo gets bigger and changes happen in the apps.

### Chapter 2: Follow Along

To show how we iteratively did our refactoring, you can see each "iteration" of the `checkout.spec.ts` file:

1. Use fixtures to create a SEAM for authentication and page navigation
    * [checkout1-auth.spec.ts](tests/sauce/checkout1-auth.spec.ts)
    * [fixtures1-3.ts](tests/sauce/fixtures1-3.ts)

2. Start refactoring action flows into Page Objects
    * [checkout2-page.spec.ts](tests/sauce/checkout2-page.spec.ts)
    * [pages/cart.ts](tests/sauce/pages/cart.ts)
    * [fixtures1-3.ts](tests/sauce/fixtures1-3.ts)

3. Refactor the checkout flow into a CheckoutPage Page Object
    * [checkout3-pages.spec.ts](tests/sauce/checkout3-pages.spec.ts)
    * [pages/checkout.ts](tests/sauce/pages/checkout.ts)
    * [fixtures1-3.ts](tests/sauce/fixtures1-3.ts)

4. Refactor CartPage and CheckoutPage into fixtures
    * [checkout4-page-fixture.spec.ts](tests/sauce/checkout4-page-fixture.spec.ts)
    * [fixtures4.ts](tests/sauce/fixtures4.ts)

5. Group pages into a Pages object
    * [checkout5-sauce.spec.ts](tests/sauce/checkout5-sauce.spec.ts)
    * [pages/pages.ts](tests/sauce/pages/pages.ts)
    * [fixtures5.ts](tests/sauce/fixtures5.ts)

### Ch2: Challenges

Before starting on these challenges, your `/tests/sauce` folder should look like this:

* 📂 `/tests/sauce`
  * 📂 features
  * 📂 pages
    * 📄 cart.ts
    * 📄 checkout.ts
    * 📄 pages.ts
  * 🧪 checkout.spec.ts
  * ⛓️ fixtures.ts

### Challenge 1: Create the InventoryPage and use it in our test

We have some remaining "scripted" lines in our test:

```js
await page.goto('/inventory.html')
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
```

Refactor these into a new `InventoryPage` class and "hook it up" with the rest of what we've built!
Then use it in our test and get it to pass with no errors.

### Challenge 2: Write a new test that covers sorting products in the Inventory

With your new knowledge and power, write a completely new test file that covers the different sorting scenarios on the Inventory (aka Products) page.

## Chapter 3: Create Data-Driven UI Tests with an API

In this chapter, our Application Under Test (AUT) will be [DemoQA.com](https://demoqa.com) since it has a frontend and an API we can use to get or set data. This opens up more advanced scenarios than the SauceDemo app we used in previous chapters:

* Do API Test Automation against their endpoints (see their [Swagger Docs](https://demoqa.com/swagger))
* Explore UI Test Automation on a different app (see their [Bookstore App](https://demoqa.com/books))
* Get and Set data using their API to drive what happens within the UI test

> 💡 We call this `"data-driven testing"` because we control the data, environment, and app state to ***test our scenarios more quickly and reliably***

### Setup

To start off, let's set up the project so it's isolated.

1. Create a `demoqa` project in our `playwright.config.ts` file so we have things like `baseURL`

    ```ts
    {
        name: 'demoqa',
        use: {
            // ...devices['Desktop Chrome'],
            baseURL: 'https://www.demoqa.com',
        },
    },
    ```

2. Next, create a new `demoqa` folder under `tests` to store our relevant tests and files
3. In VS Code, make sure to select `demoqa` as the active project in the Playwright extension

### Chapter 3: Follow Along

To show how we iteratively did our refactoring, you can see each "iteration" of the `checkout.spec.ts` file:

1. Create an API Test to explore how to create a user with Playwright
    * [api.spec.ts](tests/demoqa/api.spec.ts)

2. Create an API Test to explore how to authorize a user to get a token
    * [api1-auth.spec.ts](tests/demoqa/api1-auth.spec.ts)

3. Make an interface and "service" functions
    * [api2-functions.spec.ts](tests/demoqa/api2-functions.spec.ts)

4. Generate fake data with `faker.js` to avoid "already exists" errors
    * [api3-faker-refactor.spec.ts](tests/demoqa/api3-faker-refactor.spec.ts)
    * [services/account.ts](tests/demoqa/services/account.ts)

5. Use the account service to create an authorized user and login with it in the UI
    * [api4-ui.spec.ts](tests/demoqa/api4-ui.spec.ts)
    * [fixtures4.ts](tests/demoqa/fixtures4.ts)

6. Use the bookstore service to create an authorized user and give them some books
    * [api5-bookstore.spec.ts](tests/demoqa/api5-bookstore.spec.ts)
    * [services/bookstore.ts](tests/demoqa/services/bookstore.ts)

7. Use everything we've learned to make a data-driven test
    * [api6-user-with-books-in-ui.spec.ts](tests/demoqa/api6-user-with-books-in-ui.spec.ts)
    * [fixtures6.ts](tests/demoqa/fixtures6.ts)

### Challenges

Now that you have the fundamentals of Data-Driven testing using APIs, feel free to make this your own! These challenges will help solidify your understanding by *applying* what you've learned. As you've seen, moving "out of playwright" requires regular programming knowledge, so it might be a good idea to take some javascript/typescript courses first.

#### Challenge 1: Organize the tests

The "Follow Along" is helpful, but at a company, you wouldn't see iterative files like that. For this challenge, organize the tests into UI and API folders and give things better names. For example:

* 📂 `/tests/demoqa`
  * 📂 services
    * 📄 account.ts
    * 📄 bookstore.ts
  * 📂 ui
    * 🧪 profile.spec.ts
  * 📂 api
    * 🧪 account.spec.ts
    * 🧪 bookstore.spec.ts
  * ⛓️ fixtures.ts

#### Challenge 2: Create feature files and page objects

This chapter highlighted how to do data-driven testing, but we skipped breaking down the app into features and scenarios 😱
In this challenge, take the time to break down the bookstore website into features and scenarios.

* Create a `/features` folder and put your markdown and `.feature` files within it
* Create page objects in a `/pages` folder, similar to what we did in Chapter 2
* BONUS: Write the tests to achieve 100% Product Coverage of the bookstore website!

Things should still feel organized. For example:

* 📂 `/tests/demoqa`
  * 📂 features
  * 📂 pages
    * 📄 books.ts
    * 📄 login.ts
    * 📄 profile.ts
  * 📂 services
    * 📄 account.ts
    * 📄 bookstore.ts
  * 📂 ui
    * 🧪 profile.spec.ts
  * 📂 api
    * 🧪 account.spec.ts
    * 🧪 bookstore.spec.ts
  * ⛓️ fixtures.ts
