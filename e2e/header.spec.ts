import { expect, test } from "@playwright/test";
import { siteConfig } from "../config/site";
import { copy } from "../content/copy";
import { gotoHome } from "./helpers";

async function revealHeader(page: import("@playwright/test").Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await gotoHome(page);
  const intro = page.locator(".intro-loader");
  if ((await intro.count()) > 0) {
    await intro.waitFor({ state: "detached", timeout: 8_000 });
  }
  await page.locator("#manifesto").evaluate((node) => {
    node.scrollIntoView({ block: "start", behavior: "instant" });
  });
  await expect(page.locator("header.site-header")).toHaveAttribute(
    "data-visible",
    "true",
  );
}

test.describe("site header", () => {
  test("stays out of the way during the Hero", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoHome(page);

    await expect(page.locator("header.site-header")).toHaveAttribute(
      "data-visible",
      "false",
    );
    await expect(page.getByRole("banner")).toHaveCount(0);
  });

  test("docks after the Hero with WhatsApp CTA and section nav", async ({
    page,
  }) => {
    await revealHeader(page);

    const banner = page.getByRole("banner");
    await expect(banner).toBeVisible();
    await expect(
      banner.getByRole("link", { name: copy.cta.buttonLabel }),
    ).toBeVisible();
    await expect(
      banner.getByRole("link", { name: copy.cta.buttonLabel }),
    ).toHaveAttribute("href", siteConfig.whatsapp);
    await expect(
      banner.getByRole("navigation", { name: copy.nav.primary }),
    ).toBeVisible();
    await expect(
      banner.getByRole("link", { name: copy.nav.specialties }),
    ).toBeVisible();
  });

  test("tracks the paper field on the Manifesto", async ({ page }) => {
    await revealHeader(page);

    await expect(page.locator("header.site-header")).toHaveAttribute(
      "data-tone",
      "paper",
    );
  });
});
