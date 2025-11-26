// tests/learning/tags/
// tag_tests.spec.ts

import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page";

test("Tag Test", { tag: "@mujTag" }, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
});

test("Without Tag Test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
});

test.describe("Tagged Test Suite", { tag: "@mujTag" }, () => {
  test("Tagged test from Describe 1", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test("Tagged test from Describe 2", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
  });
});
