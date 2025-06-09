
# 🐾 Pet Online Store API Tests

This repository contains automated tests for the [Swagger Petstore API](https://petstore.swagger.io/), using [Playwright](https://playwright.dev/) and TypeScript. The project is structured for modular test development and includes CI integration with GitHub Actions.

---

## 📁 Project Structure

pet-online-store/
├── .github/workflows/ # CI configuration for GitHub Actions
│ └── playwright-schedule.yml
├── data/ # Constants and shared types
│ ├── constants.ts
│ └── types.ts
├── helpers/ # Utility functions (e.g. pet data generation)
│ └── general.ts
├── tests/ # All Playwright test files
│ ├── create-pet-petstore.spec.ts
│ ├── data-setup.spec.ts
│ ├── get-pet-petstore.spec.ts
│ └── update-pet-petstore.spec.ts
├── validation/ # Validation helpers (if needed)
│ └── general.ts
├── env.ts # Environment variables (e.g. API key)
├── eslint.config.mjs # ESLint configuration
├── package.json
├── package-lock.json
├── playwright.config.ts # Playwright configuration
└── tsconfig.json # TypeScript config


## Install Playwright browsers
npx playwright install --with-deps


## 🧪 Running Tests Locally
Run all tests: 

npx playwright test

Run a specific project (e.g., create pet tests):

npx playwright test --project=create-pet-online-store

You can also run individual test files:

npx playwright test tests/create-pet-petstore.spec.ts


## ⚙️ Configuration
Environment
Set your API_KEY in a .env file or pass it in the environment:

export API_KEY=your_api_key_here
env.ts reads and exports the key for use in playwright.config.ts.


## 🧱 Test Projects
Playwright is configured with multiple projects for better separation and dependency management:

data-setup – Prepares data needed for other tests

create-pet-online-store – Tests for creating pets

get-pet-online-store – Tests for retrieving pets (depends on data-setup)

update-pet-online-store – Tests for updating pets (depends on data-setup)

## ⚡ Continuous Integration
GitHub Actions
This project includes a GitHub Actions workflow (.github/workflows/playwright-schedule.yml) to run tests in CI.

Jobs
data-setup – Runs first and uploads petData.json for downstream tests

get-pet-online-store – Depends on data-setup, downloads test data and runs tests


## Secrets required:

API_KEY – Set in the repository’s secrets

