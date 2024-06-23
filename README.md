# Autobots: Playwright with TypeScript

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

### Challenges

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
