// tests/test-structure/
// test_structure.spec.ts
import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

// ? Zkratka: pwd (pw-describe)
test.describe("Testovací sada - describe", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  // ? Objekt (parametr) page jsme nepoužili z důvodu toho, že díky použití a předání do PO v beforeEach už page uvnitř metody test nepoužíváme - pokud ho budeme chtít použít přímo v testu, pak jej musíme zpět přidat
  test("Pmtool Login", async () => {
    await loginPage.fillUsername("pw_academy");
    await loginPage.fillPassword("Playwright321!");
    await loginPage.clickLogin();
  });

  test("Pmtool Failed Login", async () => {
    await loginPage.fillUsername("ABCD");
    await loginPage.fillPassword("EFGH");
    await loginPage.clickLogin();
  });
});
