import { expect, test } from "@playwright/test";
import { copy } from "../content/copy";
import { specialists } from "../content/specialists";
import { gotoHome } from "./helpers";

test.describe("specialists", () => {
  test("lists the full clinical team without overlay brand copy", async ({
    page,
  }) => {
    await gotoHome(page);
    const section = page.locator("#specialists");

    await expect(page.locator("#specialists-heading")).toContainText(
      copy.specialists.heading,
    );
    await expect(section.locator("article")).toHaveCount(specialists.length);
    await expect(section.locator("article h3")).toHaveText(
      specialists.map((specialist) => specialist.name),
    );

    for (const specialist of specialists) {
      await expect(section.getByText(specialist.title ?? "", { exact: true })).toBeAttached();
    }

    await expect(page.getByText("Escolhido com critério.")).toHaveCount(0);
    await expect(
      page.getByText(
        "Tecnologias e marcas presentes em nossa prática clínica, selecionadas de acordo com cada indicação.",
      ),
    ).toHaveCount(0);
  });
});
