// src/pages/pmtool/
// login_page.ts

import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly url = "https://tredgate.com/pmtool"; // ? Bude jen v prvním PO, kde budeme otvírat aplikaci
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly lostPasswordButton: Locator;

  constructor(page: Page) {
    this.page = page; // ? Nastavení stránky (abychom mohli interagovat s prohlížečem)
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator('[type="submit"]');
    this.lostPasswordButton = page.locator("#forget_password");
  }

  async open() {
    await this.page.goto(this.url);
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async clickPasswordForgotten() {
    await this.lostPasswordButton.click();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }
}
