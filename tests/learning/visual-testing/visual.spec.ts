// tests/learning/visual-testing/
// visual.spec.ts

import { expect, test } from "@playwright/test";
import path from "path";

test("Simple Visual Test", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");
  await expect(page).toHaveScreenshot("simple_test.png");
});

test("Failing Visual Test", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/dynamic-content.html");
  await expect(page).toHaveScreenshot("failing_test.png");
});

test("Full Page Visual Test", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");
  await expect(page).toHaveScreenshot("full_page_test.png", {
    fullPage: true,
  });
});

test("Lower Visual Test Sensitivity", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");
  await expect(page).toHaveScreenshot("low_sensitivity.png", {
    maxDiffPixelRatio: 0.05, // snížíme citlivost: maximální rozdíl pixelů 5 %
    maxDiffPixels: 500, // maximální rozdíl pixelů: 500, nepoužívají se obě properties naráz
  });
});

test("Masking Elements", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");
  await expect(page).toHaveScreenshot("masked_elements.png", {
    fullPage: true,
    mask: [
      page.locator('[data-testid="hover-box"]'),
      page.locator('[data-testid="drag-drop-box"]'),
    ],
  });
});

test("Hiding elements with CSS", async ({ page }) => {
  const cssPath = path.resolve(__dirname, "./visual_tests.css");
  await page.goto("https://tredgate.com/webtrain/dynamic-content.html");
  await expect(page).toHaveScreenshot("hidden_elements.png", {
    fullPage: true,
    stylePath: cssPath,
  });
});

test("Image Visual Test", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/index.html");
  await expect(page.locator("#playwright-logo")).toHaveScreenshot(
    "image_test.png"
  );
});

test("Visual checks for modules and elements", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/index.html");
  await page.locator("#name").fill("TEST");
  await expect(page.locator("#name")).toHaveScreenshot("element.png");
  await expect(
    page.locator('//input[@id="name"]//ancestor::section')
  ).toHaveScreenshot("module.png");
});
