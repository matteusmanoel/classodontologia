import { expect, test } from "@playwright/test";
import { assertGoldenLogoNotBlack, gotoHome } from "./helpers";

test.describe("prefers-reduced-motion", () => {
  test("GoldenLogo poster is visible and video is not animating", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoHome(page);

    await expect(page.locator(".golden-logo")).toBeVisible();
    await expect(page.locator(".golden-logo-poster")).toBeVisible();
    await expect(page.locator(".golden-logo-video")).toBeHidden();

    const video = page.locator(".golden-logo-video");
    if ((await video.count()) > 0) {
      await expect(video).toHaveJSProperty("paused", true);
    }

    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.getByRole("region", { name: "Hero" })).toBeVisible();

    await assertGoldenLogoNotBlack(page);
  });
});
