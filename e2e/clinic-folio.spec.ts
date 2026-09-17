import { expect, test } from "@playwright/test";
import { clinicPlates } from "../content/clinic";
import { copy } from "../content/copy";
import { gotoHome } from "./helpers";

test.describe("clinic folio", () => {
  test("sits between A clínica and Especialidades with all four plates and no overlay copy", async ({
    page,
  }) => {
    await gotoHome(page);
    const folio = page.locator("#clinic-folio");
    const manifesto = page.locator("#manifesto");
    const specialties = page.locator("#specialties");

    await expect(manifesto).toBeVisible();
    await expect(folio).toBeVisible();
    await expect(page.locator("#manifesto-heading")).toContainText(
      copy.manifesto.headline,
    );
    await expect(folio.getByText(copy.manifesto.headline)).toHaveCount(0);

    for (const plate of clinicPlates) {
      await expect(folio.locator(`img[src*="${plate.id}"]`)).toBeAttached();
    }
    await expect(folio.locator(".clinic-folio-veil")).toBeAttached();

    const order = await page.evaluate(() =>
      [...document.querySelectorAll("#manifesto, #clinic-folio, #specialties")].map(
        (el) => el.id,
      ),
    );
    expect(order).toEqual(["manifesto", "clinic-folio", "specialties"]);
    await expect(specialties).toBeAttached();
  });

  test("reduced motion stacks the plates without a pin", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoHome(page);
    await expect(page.locator("#clinic-folio")).toHaveClass(/clinic-folio--static/);
    await expect(page.locator("#clinic-folio .clinic-folio-stack-item")).toHaveCount(4);
  });
});
