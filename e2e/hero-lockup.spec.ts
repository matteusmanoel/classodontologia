import { expect, test } from "@playwright/test";
import { DECOMPOSED_FILES } from "../content/logoPieces";
import { gotoHome } from "./helpers";

function expectedCount(file: string): number {
  if (file === "s-letter.png") return 2;
  if (file === "o-letter.png") return 4;
  if (file === "l-letter.png") return 2;
  return 1;
}

function srcHitsFile(src: string, file: string): boolean {
  return src.includes(`/${file}`) || src.includes(`%2F${file}`);
}

test.describe("hero decomposed lockup", () => {
  test("renders every decomposed logo asset inside the wordmark", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoHome(page);

    const lockup = page.locator(".decomposed-lockup");
    await expect(page.locator(".wordmark")).toBeVisible();
    await expect(lockup).toBeVisible();
    await expect(lockup.locator('[data-piece="swirl"]')).toHaveCount(1);
    await expect(lockup.locator('[data-piece="registered"]')).toHaveCount(1);
    await expect(lockup.locator('[data-piece="line"]')).toHaveCount(1);
    await expect(lockup.locator(".lockup-class-letter")).toHaveCount(5);
    await expect(lockup.locator(".lockup-odonto-letter")).toHaveCount(11);
    await expect(lockup.locator(".lockup-seal")).toHaveCount(2);

    const srcs = await lockup.locator("img").evaluateAll((images) =>
      images.flatMap((image) => [
        image.getAttribute("src") ?? "",
        image.getAttribute("srcset") ?? "",
      ]),
    );

    for (const file of DECOMPOSED_FILES) {
      const hits = srcs.filter((src) => srcHitsFile(src, file)).length;
      expect(hits, `decomposed asset ${file}`).toBeGreaterThanOrEqual(
        expectedCount(file),
      );
    }
  });

  test("lockup seals recover after a footer round-trip", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await gotoHome(page);

    const lockup = page.locator(".decomposed-lockup");
    await expect(lockup).toHaveAttribute("data-lockup", "settled", {
      timeout: 8_000,
    });
    await expect(page.locator(".wordmark")).toBeVisible();

    await page.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight);
    });
    await page.waitForTimeout(500);
    await page.locator("footer, [role='contentinfo']").first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(700);

    await expect(page.locator(".wordmark")).toBeVisible();
    await expect(lockup).toHaveAttribute("data-lockup", "settled");

    const paint = await lockup.evaluate((el) => {
      const seal = el.querySelector(".lockup-seal-class");
      const wordmark = el.closest(".wordmark");
      const sealStyles = seal ? getComputedStyle(seal) : null;
      const markStyles = wordmark ? getComputedStyle(wordmark) : null;
      return {
        sealOpacity: sealStyles ? Number.parseFloat(sealStyles.opacity) : 0,
        wordmarkOpacity: markStyles ? Number.parseFloat(markStyles.opacity) : 0,
      };
    });

    expect(paint.wordmarkOpacity, "wordmark must be visible at the top").toBeGreaterThan(
      0.5,
    );
    expect(paint.sealOpacity, "CLASS seal must be visible at rest").toBeGreaterThan(0.5);
  });
});
