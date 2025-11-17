import { test } from "@playwright/test";
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";

test("Exercise: E2E lost password using fluent interface", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .open()
    .then((login) => login.clickPasswordForgotten())
    .then((lostPassword) => lostPassword.fillEmail("lost_password@tredgate.cz"))
    .then((lostPassword) => lostPassword.fillUsername("lost_password_user"))
    .then((lostPassword) => lostPassword.clickSend());
});

test("Exercise: Click Back button in Lost Password", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .open()
    .then((login) => login.clickPasswordForgotten())
    .then((lostPassword) => lostPassword.clickBack());
});
