/**
 * Condensed narrative: spine order, soft CTAs, WhatsApp links,
 * the floating CTA, and the first-visit steps.
 */

import { expect, test } from "@playwright/test";
import { siteConfig, whatsappHref } from "../config/site";
import { copy } from "../content/copy";
import { gotoHome } from "./helpers";

test.describe("condensed narrative", () => {
  test("Legacy is retired and the spine keeps its order", async ({ page }) => {
    await gotoHome(page);

    await expect(page.locator("#legacy")).toHaveCount(0);

    const order = await page.evaluate(() =>
      [
        ...document.querySelectorAll(
          "#manifesto, #clinic-folio, #specialties, #method, #specialists, #selected-by-class, #place",
        ),
      ].map((el) => el.id),
    );
    expect(order).toEqual([
      "manifesto",
      "clinic-folio",
      "specialties",
      "method",
      "specialists",
      "selected-by-class",
      "place",
    ]);
  });

  test("hero carries the new promise, not the old study-of-the-face lines", async ({
    page,
  }) => {
    await gotoHome(page);
    const heroText = await page.locator("section[aria-label='Hero']").textContent();

    expect(heroText).toContain("Você merece sorrir com Class.");
    expect(heroText).not.toContain("Cada tratamento começa no estudo da face.");
    expect(heroText).not.toContain("décadas");
  });

  test("four soft CTAs link to the same WhatsApp message", async ({ page }) => {
    await gotoHome(page);

    const soft = page.locator("[data-soft-cta]");
    await expect(soft).toHaveCount(4);

    for (const id of ["folio", "specialties", "method", "specialists"] as const) {
      const link = page.locator(`[data-soft-cta='${id}'] a.soft-cta-link`);
      await expect(link).toHaveText(copy.cta.soft[id].label);
      await expect(link).toHaveAttribute("href", whatsappHref());
    }

    const href = whatsappHref();
    expect(href).toContain(`${siteConfig.whatsapp}?text=`);
    expect(decodeURIComponent(href)).not.toContain("seção:");
  });

  test("soft CTAs never sit inside a pinned or scrubbed scene", async ({ page }) => {
    await gotoHome(page);
    const nested = await page
      .locator(
        ".specialties-stage-shell [data-soft-cta], .method-tl-shell [data-soft-cta], .clinic-folio [data-soft-cta], .hero-cinematic [data-soft-cta]",
      )
      .count();
    expect(nested).toBe(0);
  });

  test("floating CTA stays out of the Hero and appears after it", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await gotoHome(page);

    const fab = page.locator(".whatsapp-fab");
    await expect(fab).toHaveAttribute("data-visible", "false");

    await page.locator("#manifesto").evaluate((node) => {
      node.scrollIntoView({ block: "start", behavior: "instant" });
    });
    await expect(fab).toHaveAttribute("data-visible", "true");
    await expect(fab).toHaveAttribute("href", whatsappHref());
  });

  test("the Place close explains the first visit and keeps one primary CTA", async ({
    page,
  }) => {
    await gotoHome(page);
    const place = page.locator("#place");

    await expect(place.locator(".visit-step")).toHaveCount(copy.conversion.steps.length);
    await expect(place.getByText(copy.conversion.freeNote)).toBeAttached();
    await expect(
      place.getByRole("link", { name: copy.cta.buttonLabel }),
    ).toHaveCount(1);
  });

  test("no video player ships while every video slot is empty", async ({ page }) => {
    await gotoHome(page);
    await expect(page.locator("dialog.video-lightbox")).toHaveCount(0);
    await expect(page.locator("video.loop-video")).toHaveCount(0);
  });

  test("reduced motion: soft CTAs and visit steps stay readable", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoHome(page);

    await expect(page.locator("[data-soft-cta='method'] a.soft-cta-link")).toBeAttached();
    await expect(page.locator("#place .visit-step").first()).toBeAttached();
  });
});
