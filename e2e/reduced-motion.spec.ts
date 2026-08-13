import { expect, test } from "@playwright/test";
import { assertHeroNotBlack, gotoHome } from "./helpers";

test.describe("prefers-reduced-motion", () => {
  test("wordmark and tooth poster remain visible without video motion", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoHome(page);

    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".wordmark")).toBeVisible();
    await expect(page.locator(".tooth-scrubber-poster")).toBeVisible();
    await expect(page.locator(".tooth-scrubber-video")).toBeHidden();

    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.getByRole("region", { name: "Hero" })).toBeVisible();

    await assertHeroNotBlack(page);
  });
});
