import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright QA suite (ISSUE-017 / QA_STRATEGY.md).
 *
 * Browsers: Chromium + WebKit. Playwright WebKit is an automated
 * approximation of WebKit rendering — it is not Safari macOS or iOS Safari.
 *
 * Default target: production server on localhost after `pnpm build`.
 * Override with PLAYWRIGHT_BASE_URL for a Preview (SSO-protected Previews
 * need authenticated access; unauthenticated requests 302).
 */

const localPort = 3017;
const localBaseURL = `http://127.0.0.1:${localPort}`;
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? localBaseURL;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        browserName: "chromium",
      },
    },
    {
      name: "webkit",
      use: {
        browserName: "webkit",
        viewport: { width: 1280, height: 720 },
      },
      testMatch: /smoke\.spec\.ts|viewports\.spec\.ts/,
    },
  ],
  ...(process.env.PLAYWRIGHT_BASE_URL
    ? {}
    : {
        webServer: {
          command: `pnpm build && pnpm exec next start -p ${localPort}`,
          url: localBaseURL,
          reuseExistingServer: !process.env.CI,
          timeout: 180_000,
          stdout: "pipe",
          stderr: "pipe",
        },
      }),
});
