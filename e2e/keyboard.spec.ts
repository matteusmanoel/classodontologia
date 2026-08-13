import { expect, test } from "@playwright/test";
import { siteConfig } from "../config/site";
import { copy } from "../content/copy";
import { gotoHome } from "./helpers";

const FOCUS_GOLD = "rgb(232, 201, 122)";

test.describe("keyboard and CTA", () => {
  test("Tab reaches the CTA and shows a focus-visible ring", async ({
    page,
  }) => {
    await gotoHome(page);

    const cta = page.getByRole("link", { name: copy.cta.buttonLabel });
    await expect(cta).toBeVisible();

    let reached = false;
    for (let i = 0; i < 20; i += 1) {
      await page.keyboard.press("Tab");
      if (await cta.evaluate((el) => el === document.activeElement)) {
        reached = true;
        break;
      }
    }

    expect(reached, "Tab traversal must reach the appointment CTA").toBe(true);
    await expect(cta).toBeFocused();

    const outline = await cta.evaluate((el) => {
      const styles = getComputedStyle(el);
      return {
        outlineStyle: styles.outlineStyle,
        outlineWidth: styles.outlineWidth,
        outlineColor: styles.outlineColor,
        outlineOffset: styles.outlineOffset,
      };
    });

    expect(outline.outlineStyle).not.toBe("none");
    expect(Number.parseFloat(outline.outlineWidth)).toBeGreaterThanOrEqual(2);
    expect(outline.outlineColor).toBe(FOCUS_GOLD);
    expect(Number.parseFloat(outline.outlineOffset)).toBeGreaterThanOrEqual(3);
  });

  test("CTA href matches the siteConfig.whatsapp placeholder", async ({
    page,
  }) => {
    await gotoHome(page);

    const cta = page.getByRole("link", { name: copy.cta.buttonLabel });
    await expect(cta).toHaveAttribute("href", siteConfig.whatsapp);
    expect(siteConfig.whatsapp).toContain("[WHATSAPP_NUMBER");
    expect(siteConfig.whatsapp).not.toMatch(/^\+?\d/);
  });
});
