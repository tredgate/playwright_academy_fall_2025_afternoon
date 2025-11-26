// tests/learning/test-structure/
// test_steps.spec.ts

import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";
import { DashboardPage } from "../../../src/pages/pmtool/dashboard_page.ts";

test("Steps hooks in Test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  // ! Stepy primo v testech pouzivame minimalne, protoze snizuji citelnost a rozbiji fluent API. Nejlepsi umisteni je do Page Objectu, konrektne sdruzenych metod (mrkni do LoginPage.login())
  await test.step("Login to Pmtool", async () => {
    await loginPage
      .open()
      .then((login) => login.login("pw_academy", "Playwright321!"));
  });
  const dashboardPage = new DashboardPage(page);
  await dashboardPage
    .clickProfile()
    .then((dashboard) => dashboard.clickLogout());
});
