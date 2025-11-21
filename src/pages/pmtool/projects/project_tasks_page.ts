import { expect, Locator, Page } from "@playwright/test";
import { LoginPage } from "../login_page.ts";

export class ProjectTasksPage {
  readonly page: Page;
  readonly profileButton: Locator;
  readonly logoutButton: Locator;
  readonly bellButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileButton = page.locator("#user_dropdown");
    this.logoutButton = page.locator("#logout");
    this.bellButton = page.locator("#user_notifications_report");
  }

  async clickProfile() {
    await expect(this.bellButton).toBeVisible();
    await this.profileButton.click();
    return this;
  }

  async clickLogout() {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }
}
