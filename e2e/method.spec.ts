/**
 * Method timeline — field evolution, placeholders, reduced-motion list.
 */

import { expect, test } from "@playwright/test";
import { methodBeats } from "../content/method";
import { gotoHome } from "./helpers";

test.describe("method timeline", () => {
  test("section heading and all beats are present", async ({ page }) => {
    await gotoHome(page);
    const section = page.locator("#method");
    await expect(section).toBeVisible();
    await expect(page.locator("#method-heading")).toContainText("critério");
    await expect(section.getByText("Tecnologia, com propósito.")).toBeAttached();

    for (const beat of methodBeats) {
      await expect(section.getByText(beat.from, { exact: false }).first()).toBeAttached();
      await expect(section.getByText(beat.to, { exact: false }).first()).toBeAttached();
    }
  });

  test("placeholder plates expose asset ids until real photos land", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await gotoHome(page);

    const placeholders = methodBeats.filter((beat) => !beat.imageSrc);
    expect(placeholders.length).toBeGreaterThan(0);

    for (const beat of placeholders) {
      await expect(page.locator("#method").getByText(beat.assetId)).toBeVisible();
    }
  });

  test("reduced-motion keeps every beat readable without the sticky shell", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1280, height: 720 });
    await gotoHome(page);

    await expect(page.locator(".method-tl-shell")).toHaveCount(0);
    await expect(page.locator(".method-tl-list")).toBeVisible();

    for (const beat of methodBeats) {
      await expect(
        page.locator("#method").getByText(beat.title, { exact: true }).first(),
      ).toBeVisible();
    }
  });

  test("no horizontal overflow at 375px", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await gotoHome(page);

    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(375 + 1);
  });
});
