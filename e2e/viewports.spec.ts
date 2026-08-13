import { expect, test } from "@playwright/test";
import { gotoHome } from "./helpers";

const VIEWPORTS = [
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1280, height: 720 },
  { width: 1920, height: 1080 },
] as const;

test.describe("viewport screenshots", () => {
  // Static poster avoids autoplay frame flake. Not a mobile product freeze
  // (Spike C / ISSUE-019 remains blocked).
  for (const { width, height } of VIEWPORTS) {
    test(`full-page screenshot at ${width}px`, async ({ page }, testInfo) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.setViewportSize({ width, height });
      await gotoHome(page);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator(".wordmark")).toBeVisible();

      const screenshot = await page.screenshot({
        fullPage: true,
        animations: "disabled",
      });
      expect(screenshot.byteLength).toBeGreaterThan(1_000);
      await testInfo.attach(`viewport-${width}`, {
        body: screenshot,
        contentType: "image/png",
      });
    });
  }
});

test.describe("mobile layout", () => {
  test("no horizontal overflow at 375px", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await gotoHome(page);

    const overflowing = await page.evaluate((viewportWidth) => {
      const extra = 1;
      const hits: { tag: string; cls: string; text: string; right: number }[] =
        [];

      for (const el of document.querySelectorAll("body *")) {
        if (el.closest(".tooth-scrubber")) {
          continue;
        }

        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          continue;
        }
        if (rect.right <= viewportWidth + extra) {
          continue;
        }

        hits.push({
          tag: el.tagName,
          cls: typeof el.className === "string" ? el.className : "",
          text: (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 120),
          right: Math.round(rect.right),
        });
      }

      return hits;
    }, 375);

    const placeholderCopy = /\[.+(PLACEHOLDER|REQUIRED BEFORE LAUNCH)/;
    const copyTags = new Set(["H1", "H2", "H3", "P", "SPAN", "LI", "A"]);
    const layoutOverflow = overflowing.filter((el) => {
      const placeholderText = copyTags.has(el.tag) && placeholderCopy.test(el.text);
      return !placeholderText;
    });

    expect(
      layoutOverflow,
      `layout overflow at 375px (placeholder copy excluded — ISSUE-021):\n${JSON.stringify(layoutOverflow, null, 2)}`,
    ).toEqual([]);
  });
});
