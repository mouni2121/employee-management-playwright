# BrightHR UI Test Automation

Playwright end-to-end tests for the BrightHR sandbox, written in TypeScript. The project demonstrates a small, maintainable UI automation framework using page objects, fixtures, accessible locators, generated test data, and failure artifacts.

## Requirements

- Node.js and npm
- Access to the BrightHR sandbox at `https://sandbox-app.brighthr.com`
- A sandbox account permitted to create and delete employee records

## Setup

Install dependencies:

```bash
npm ci
npx playwright install chromium
```

Create a local `.env` file from the example:

```powershell
Copy-Item .env.example .env
```

Set the sandbox credentials in `.env`:

```dotenv
USER_EMAIL=your-sandbox-email
USER_PASSWORD=your-sandbox-password
```

The Playwright configuration checks that both variables are present before running. Keep real credentials local; do not commit `.env`.

## Running the tests

```bash
# Run all tests
npm test

# Run with a visible browser
npm run test:headed

# Run a specific test file
npx playwright test tests/employee.spec.ts

# Open the latest HTML report
npm run report
```

The configured browser project is Chromium. On CI, tests are retried up to two times and run with one worker. Locally, tests run in parallel by default.

The GitHub Actions workflow runs the type check and Playwright tests for pushes and pull requests to `main` and `master`. Configure the `USER_EMAIL` and `USER_PASSWORD` repository secrets for the sandbox account.

## Current coverage

The employee tests cover:

- Logging into the sandbox and navigating to the Employee hub
- Creating two employees with generated unique names and email addresses
- Verifying success messages and that both employee cards appear
- Checking that the save action stays disabled until all required employee fields are filled

The create test registers its generated employees with a fixture that attempts to remove them after the test. These tests modify sandbox data, so use a dedicated test account and verify cleanup if a run is interrupted.

## Project structure

```text
Builders/       Generated employee test data
Components/     Shared UI components, such as side navigation
Fixtures/       Playwright fixtures and page-object setup
Pages/          Page objects for login, employee hub, and employee profile
Types/          TypeScript employee data shape
tests/          End-to-end test scenarios
playwright.config.ts
```

## Framework choices and next steps

- **Page objects and fixtures** keep UI interactions reusable while tests describe user-visible behavior.
- **Role-, label-, and test-id-based locators** favor resilient selectors over brittle positional selectors.
- **Generated employee data** reduces collisions when tests run repeatedly.
- **Failure artifacts** are configured to retain traces, screenshots, and video when a test fails.

Current scope is intentionally focused on the employee creation flow in Chromium. Further coverage could include employee field validation messages, editing and deleting employee records, and cross-browser runs where they match the product's support requirements.
