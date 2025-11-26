// tests/learning/asserts/
// asserts.spec.ts
import { expect, test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";
import { DashboardPage } from "../../../src/pages/pmtool/dashboard_page.ts";

test.describe("Asserts - Testing in Playwright", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage
      .open()
      .then((login) => login.login("pw_academy", "Playwright321!"));
  });

  test("toContainText - assert part of elements text", async ({ page }) => {
    // * Expect, ve kterém používáme prvek uložený v proměnné - lepší čitelnost
    const welcomePageHeader = page.locator("#welcome-page-header");
    await expect(welcomePageHeader).toContainText("Vítej v testovací aplikaci");
    // * Assert, kde prvek vkládáme přímo do expectu
    await expect(page.locator("#welcome-page-header")).toContainText(
      "Vítej v testovací aplikaci"
    );
    // * Assert, který má vlastní popisek (zprávu)
    await expect(
      welcomePageHeader,
      "Welcome Page Header contain Text"
    ).toContainText("Vítej v testovací aplikaci");
  });

  test("toHaveText - assert element have text", async ({ page }) => {
    const welcomePageHeader = page.locator("#welcome-page-header");
    await expect(welcomePageHeader, "Welcome Page Header have Text").toHaveText(
      "Vítej v testovací aplikaci Tredgate Project"
    );
  });

  test("toBeVisible - assert element visibility", async ({ page }) => {
    const pageLogo = page.locator(".logo");
    await expect(pageLogo, "Page Logo is Visible").toBeVisible();
  });

  test("Using Soft Asserts", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const welcomePageHeader = page.locator("#welcome-page-header");

    // ? Soft expect: pokud je expect neúspěšný, test bude pokračovat a až na konci se označí jako failed
    await expect
      .soft(welcomePageHeader, "Failing Text Assert")
      .toHaveText("Vítejte");
    await dashboardPage.clickProjects();
  });
});

test("toHaveValue - assert element value (e.g. inputs)", async ({ page }) => {
  const email = "petr5525@example.com";
  const password = "123456";
  const firstName = "Petr";

  await page.goto("https://tredgate.com/eshop/index.php?route=account/login");
  await page.locator("#input-email").fill(email);
  await page.locator("#input-password").fill(password);
  await page.locator('[type="submit"]').click();
  await page.locator('//a[text()="Edit Account"]').click();
  const firstNameInput = page.locator("#input-firstname");
  await expect(firstNameInput, "First Name have Value").toHaveValue(firstName);
});

test("Negative Asserts - element not visible", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  const loginButton = page.locator('[type="submit"]');
  const alertMessage = page.locator(".alert");
  await expect(loginButton, "Wait until login button is visible").toBeVisible();
  // ? Deaktivujeme kontrolu pro radek s kontrolou - ESlint jinak upozorni, ze existuje metoda toBeHidden();
  // eslint-disable-next-line playwright/no-useless-not
  await expect(alertMessage, "Alert message is not visible").not.toBeVisible();
});

test("Asserts in Page Objects", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open().then((login) => login.pageHeaderAsserts("Login"));
});
