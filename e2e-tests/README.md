# Project Buddie - End-to-End Tests

Playwright-based E2E tests for Project Buddie.

## Setup

```bash
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests
npm test

# Run in UI mode
npm run test:ui

# Run in headed mode (see browser)
npm run test:headed

# View report
npm run report
```

## Test Structure

```
e2e-tests/
├── tests/
│   ├── call-summarization.spec.ts
│   ├── agent-monitoring.spec.ts
│   ├── journey-visualization.spec.ts
│   └── escalation-creation.spec.ts
├── fixtures/
│   ├── mock-ctr-events.json
│   └── mock-agent-events.json
└── playwright.config.ts
```

## Writing Tests

Example test:

```typescript
import { test, expect } from '@playwright/test';

test('should display call summaries', async ({ page }) => {
  await page.goto('/dashboard/summaries');
  await expect(page.getByRole('heading', { name: 'Call Summaries' })).toBeVisible();
  await expect(page.getByRole('table')).toBeVisible();
});
```

## CI Integration

Tests run automatically on PRs via GitHub Actions.
