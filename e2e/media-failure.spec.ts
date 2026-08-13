import { expect, test } from "@playwright/test";
import { assertHeroNotBlack, blockCinematicVideos, gotoHome } from "./helpers";

test.describe("media failure", () => {
  test("Hero keeps poster fallback when cinematic video is blocked", async ({
    page,
  }) => {
    await blockCinematicVideos(page);
    await gotoHome(page);

    const hero = page.getByRole("region", { name: "Hero" });
    await expect(hero).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".wordmark")).toBeVisible();

    const heroBox = await hero.boundingBox();
    expect(heroBox?.height ?? 0).toBeGreaterThan(100);

    const posterImg = page.locator(".tooth-scrubber-poster");
    const video = page.locator(".tooth-scrubber-video");
    const posterVisible = await posterImg.isVisible();
    const videoVisible = await video.isVisible();
    expect(
      posterVisible || videoVisible,
      "native video poster or img fallback must remain",
    ).toBe(true);

    await assertHeroNotBlack(page);
  });
});
