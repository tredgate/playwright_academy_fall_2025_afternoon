// tests/learning/dictionaries/
// dictionaries.spec.ts
import { expect, test } from "@playwright/test";
import { pmtoolTexts } from "../../../assets/dictionaries/dictionary";

test("Reusing Texts with Dictionary", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await expect(page.locator(".form-title")).toHaveText(pmtoolTexts.login.title);
  await expect(page.locator("#username")).toHaveAttribute(
    "placeholder",
    pmtoolTexts.login.usernamePlaceholder
  );
});
