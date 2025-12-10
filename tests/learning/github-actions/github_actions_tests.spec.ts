// tests/learning/github-actions/github_actions_tests.spec.ts
import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test.describe(
  "GitHub Actions Tests",
  {
    tag: "@github-actions",
  },
  () => {
    const username = process.env.PMTOOL_USERNAME as string;
    const password = process.env.PMTOOL_PASSWORD as string;

    test("Pmtool Login", async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.open().then((login) => login.login(username, password));
    });

    test("Pmtool Login and Logout", async ({ page }) => {
      const loginPage = new LoginPage(page);
      loginPage
        .open()
        .then((login) => login.login(username, password))
        .then((dashboard) => dashboard.clickProfile())
        .then((dashboard) => dashboard.clickLogout());
    });
  }
);
