// tests/learning/visual-testing/
// visual.spec.ts

import { expect, test } from "@playwright/test";

test("Simple Visual Test", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");
  await expect(page).toHaveScreenshot("simple_test.png");
});
