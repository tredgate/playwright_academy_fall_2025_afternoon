import { test } from "@playwright/test";
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";
import { LostPasswordPage } from "../../src/pages/pmtool/lost_password_page.ts";

test("Reset Password is possible", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const lostPasswordPage = new LostPasswordPage(page);

  await loginPage.open();
  await loginPage.clickPasswordForgotten();
  await lostPasswordPage.fillEmail("test@tredgate.cz");
  await lostPasswordPage.fillUsername("test");
  await lostPasswordPage.clickSend();
});
