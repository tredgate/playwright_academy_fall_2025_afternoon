// tests/learning/iframe/
// handling_iframe.spec.ts
import { test } from "@playwright/test";

test("Working with iframe", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");
  // await page.locator("#name").fill("Toto se nevypíše"); // ! Nepodaří se, prvek je v iframe
  const iframePage = page.frameLocator(
    '[data-testid="test-automation-iframe"]'
  );
  await iframePage.locator("#name").fill("Píšeme v iframe");
});
