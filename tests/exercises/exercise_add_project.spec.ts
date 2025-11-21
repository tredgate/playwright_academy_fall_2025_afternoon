import { faker } from "@faker-js/faker";
import { test } from "@playwright/test";
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";

test("Cvičení: vytvoření projektu v Pmtool", async ({ page }) => {
  const projectName =
    faker.animal.rabbit() + "_" + faker.number.int({ max: 1_000_000 });
  const loginPage = new LoginPage(page);

  await loginPage
    .open()
    .then((login) => login.login("pw_academy", "Playwright321!"))
    .then((dashboard) => dashboard.clickProjects())
    .then((projects) => projects.clickAddProject())
    .then((newProjectForm) => newProjectForm.fillName(projectName))
    .then((newProjectForm) => newProjectForm.clickSave())
    .then((tasks) => tasks.clickProfile())
    .then((tasks) => tasks.clickLogout());
});
