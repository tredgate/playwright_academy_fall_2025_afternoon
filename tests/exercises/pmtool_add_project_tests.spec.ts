import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";

test("Exercise: Asserts", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .open()
    .then((login) => login.login("pw_academy", "Playwright321!"))
    .then((dashboard) => dashboard.clickProjects());
  const projectsTable = page.locator(".table-scrollable table");
  await expect(projectsTable, "Projects Table is Visible").toBeVisible();
  await page.locator('[test_id="Add Project"]').click();
  const nameInput = page.locator('div[data-testid="Name"] input');
  await expect(nameInput, "Name Input is Visible").toBeVisible();
  const saveButton = page.locator("button[type='submit']");
  await expect(saveButton, "Save Button have text").toHaveText("Save");
});
