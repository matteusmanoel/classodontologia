import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { gotoHome } from "./helpers";

test.describe("accessibility", () => {
  test("axe-core reports zero critical violations", async ({ page }) => {
    await gotoHome(page);

    const results = await new AxeBuilder({ page }).analyze();
    const critical = results.violations.filter(
      (violation) => violation.impact === "critical",
    );

    expect(
      critical,
      critical
        .map((violation) => `${violation.id}: ${violation.help}`)
        .join("\n"),
    ).toEqual([]);
  });
});
