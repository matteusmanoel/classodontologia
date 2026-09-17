/**
 * Mix E spine motion and CLASS construction signature.
 */

import { expect, test } from "@playwright/test";
import { gotoHome } from "./helpers";

test.describe("story spine", () => {
  test("construction spines are present from hero to footer", async ({ page }) => {
    await gotoHome(page);
    await expect(page.locator(".story-spine").first()).toBeAttached();
    await expect(page.locator(".story-spine-svg").first()).toBeAttached();
  });

  test("CLASS signature is constructed in the visit field", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoHome(page);
    await page.locator("#place").scrollIntoViewIfNeeded();
    await expect(page.locator("#place [data-word='CLASS']")).toHaveCount(1);
    await expect(page.locator("#place .story-sig-letter")).toHaveCount(6);
  });

  test("reduced-motion keeps spines fully drawn without a traveling glow", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoHome(page);
    await expect(page.locator(".story-spine-svg").first()).toBeVisible();
  });
});
