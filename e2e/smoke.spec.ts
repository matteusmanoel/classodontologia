import { expect, test } from "@playwright/test";
import { collectPageErrors, gotoHome } from "./helpers";

test.describe("smoke", () => {
  test("home page renders without console errors", async ({ page }) => {
    const errors = collectPageErrors(page);
    await gotoHome(page);

    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".wordmark")).toBeVisible();

    expect(errors, errors.join("\n")).toEqual([]);
  });

  test("h1 is present and non-empty", async ({ page }) => {
    await gotoHome(page);

    const heading = page.locator("h1");
    await expect(heading).toHaveCount(1);
    await expect(heading).toBeVisible();

    const text = (await heading.innerText()).trim();
    expect(text.length).toBeGreaterThan(0);
  });
});
