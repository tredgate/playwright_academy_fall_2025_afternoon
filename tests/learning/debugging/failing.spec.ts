// tests/learning/debugging/
// failing.spec.ts
import { test, expect } from "@playwright/test";

test("Failing Test", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await expect(page.locator("#non_existing"), "Padající assert").toBeVisible();
});
