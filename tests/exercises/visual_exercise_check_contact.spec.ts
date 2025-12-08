import { expect, test } from "@playwright/test";

test("Exercise: Simple Visual Test", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/contact.html");
  await expect(page).toHaveScreenshot("exercise_webtrain.png");
});
