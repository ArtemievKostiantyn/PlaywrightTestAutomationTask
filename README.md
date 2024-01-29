# Playwright Automation Framework Test Task

## Dependencies used

- Playwright
- Casual

### Prerequisites

- Node.js

You need to have Node.js 16 version at least (https://nodejs.org/en/) installed (Node.js LTS version recommended)

- Chrome
- Visual Studio Code

You need to have Visual Studio Code (https://code.visualstudio.com/download) installed or any other IDE to run tests

### Running project

- Open Terminal
- Type `npm install` and wait all packages will be downloaded

```bash
npm install
```

### Run tests

- Type `npx playwright test` to run all test cases(this will execute all tests in 2 browsers chrome and firefox)

```bash
npx playwright test
```

- Type `npx playwright test --project=browser_name` to run all test cases in selected browser

```bash
npx playwright test --project=firefox
```

- Type `npm run test` to run all test cases(this will execute all tests only in chrome)

```bash
npm run test
```

- Type `npx playwright test your_spec_name.spec.ts` to run all test cases inside one spec

```bash
npx playwright test cart.spec.ts
```

### Open Playwright report

- Type `npx playwright show-report` to see the last report results

```bash
npx playwright show-report
```
