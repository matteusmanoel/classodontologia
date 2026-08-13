import { expect, test } from "@playwright/test";
import { gotoHome } from "./helpers";

test.describe("tooth scroll scrub", () => {
  test("video currentTime advances and rewinds with scroll", async ({
    page,
  }) => {
    await gotoHome(page);

    const video = page.locator(".tooth-scrubber-video");
    await expect(video).toBeVisible();
    await expect(video).toHaveAttribute("data-scrub-ready", "true", {
      timeout: 15_000,
    });

    await video.evaluate((el) => {
      const node = el as HTMLVideoElement;
      node.muted = true;
      return node.readyState >= 1
        ? undefined
        : new Promise<void>((resolve) => {
            node.addEventListener("loadedmetadata", () => resolve(), {
              once: true,
            });
          });
    });

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(250);

    const atTop = await video.evaluate((el) => (el as HTMLVideoElement).currentTime);

    await page.evaluate(() => {
      window.scrollTo(0, Math.round(window.innerHeight * 1.6));
    });
    await page.waitForTimeout(400);

    const mid = await video.evaluate((el) => (el as HTMLVideoElement).currentTime);
    expect(mid, "scrub must advance while scrolling through the Hero").toBeGreaterThan(
      atTop + 0.2,
    );

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);

    const back = await video.evaluate((el) => (el as HTMLVideoElement).currentTime);
    expect(back, "scrub must rewind when scrolling back").toBeLessThan(mid - 0.15);
  });
});
