import { expect, test, type Page } from "@playwright/test";
import { gotoHome } from "./helpers";

type ToothPaint = {
  readyState: number;
  videoWidth: number;
  score: number;
  opacity: number;
  visibility: string;
};

async function waitForScrubReady(page: Page) {
  const video = page.locator(".tooth-scrubber-video");
  await expect(video).toBeVisible();
  await expect(video).toHaveAttribute("data-scrub-ready", "true", {
    timeout: 15_000,
  });
  return video;
}

async function readToothPaint(page: Page): Promise<ToothPaint> {
  return page.locator(".tooth-scrubber-video").evaluate((el) => {
    const video = el as HTMLVideoElement;
    const layer = video.closest(".tooth-scrubber");
    const styles = layer ? getComputedStyle(layer) : null;
    const paint: ToothPaint = {
      readyState: video.readyState,
      videoWidth: video.videoWidth,
      score: 0,
      opacity: styles ? Number.parseFloat(styles.opacity) : 0,
      visibility: styles?.visibility ?? "hidden",
    };

    if (video.readyState >= 2 && video.videoWidth > 0) {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, 64, 64);
        const data = ctx.getImageData(0, 0, 64, 64).data;
        let bright = 0;
        for (let i = 0; i < data.length; i += 4) {
          if ((data[i]! + data[i + 1]! + data[i + 2]!) / 3 > 16) {
            bright += 1;
          }
        }
        paint.score = bright / (64 * 64);
      }
    }

    return paint;
  });
}

test.describe("tooth scroll scrub", () => {
  test("video currentTime advances and rewinds with scroll", async ({
    page,
  }) => {
    await gotoHome(page);

    const video = await waitForScrubReady(page);

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
    expect(atTop, "scrub must start on the composed in-point, not t=0").toBeGreaterThan(
      0.5,
    );

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

  test("tooth remains paintable after scrolling to the footer and back", async ({
    page,
  }) => {
    await gotoHome(page);
    const video = await waitForScrubReady(page);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    const before = await readToothPaint(page);
    expect(before.opacity, "tooth layer must start visible").toBeGreaterThan(0.9);
    expect(before.visibility).toBe("visible");
    expect(before.score, "tooth video must paint a frame at the top").toBeGreaterThan(
      0.02,
    );

    await page.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight);
    });
    await page.waitForTimeout(400);
    await page.evaluate(() => {
      window.dispatchEvent(new Event("resize"));
    });
    await page.waitForTimeout(300);

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);

    const after = await readToothPaint(page);
    const pin = await page.locator(".hero-cinematic-pin").evaluate((el) => {
      const styles = getComputedStyle(el);
      return { opacity: styles.opacity, background: styles.backgroundColor };
    });

    expect(
      after.visibility,
      "tooth layer must be visible again at the top",
    ).toBe("visible");
    expect(
      after.opacity,
      "tooth layer must become visible again at the top",
    ).toBeGreaterThan(0.9);
    expect(
      pin.background,
      "Hero pin must return to the dark field at the top",
    ).toBe("rgb(8, 8, 8)");
    expect(
      after.readyState,
      "video must recover decoded frames after returning to the Hero",
    ).toBeGreaterThanOrEqual(2);
    expect(
      after.score,
      "tooth video must paint again after a round-trip to the footer",
    ).toBeGreaterThan(0.02);

    const lockup = page.locator(".decomposed-lockup");
    await expect(lockup).toHaveAttribute("data-lockup", "settled");
    const sealOpacity = await lockup.locator(".lockup-seal-class").evaluate((el) =>
      Number.parseFloat(getComputedStyle(el).opacity),
    );
    expect(sealOpacity, "lockup seal must return with the tooth").toBeGreaterThan(0.5);
    expect(video).toBeTruthy();
  });
});
