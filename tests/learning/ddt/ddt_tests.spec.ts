// tests/learning/ddt/
// ddt_tests.spec.ts
import { test } from "@playwright/test";
import newProjectData from "../../../assets/ddt/new_project_data.json";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test.describe("Data Driven Tests", () => {
  newProjectData.forEach((project, index) => {
    test(`${index + 1} DDT: Create project - ${project.description}`, async ({
      page,
    }) => {
      const projectName =
        project.name_prefix + faker.number.int({ max: 1_000_000 });
      const startDateForm = getStartDate(project.start_date, "YYYY-MM-DD");
      const startDateProjectInfo = getStartDate(
        project.start_date,
        "DD/MM/YYYY"
      );
      const createdDate = getStartDate("today", "DD/MM/YYYY");
      console.log(projectName);

      const loginPage = new LoginPage(page);
      await loginPage
        .open()
        .then((login) => login.login("pw_academy", "Playwright321!"))
        .then((dashboard) => dashboard.clickProjects())
        .then((projects) => projects.clickAddProject())
        .then((newProjectModal) => newProjectModal.fillName(projectName))
        .then((newProjectModal) =>
          newProjectModal.selectStatusByLabel(project.status)
        )
        .then((newProjectModal) =>
          newProjectModal.selectPriorityByLabel(project.priority)
        )
        .then((newProjectModal) => newProjectModal.fillStartDate(startDateForm))
        .then((newProjectModal) => newProjectModal.clickSave())
        .then((tasksPage) => tasksPage.clickProjectInfo())
        .then((projectInfo) => projectInfo.projectNameHaveText(projectName))
        .then((projectInfo) => projectInfo.statusHaveText(project.status))
        .then((projectInfo) => projectInfo.priorityHaveText(project.priority))
        .then((projectInfo) =>
          projectInfo.startDateHaveText(startDateProjectInfo)
        )
        .then((projectInfo) => projectInfo.dateAddedHaveText(createdDate));
    });
  });
});

function getStartDate(startDate: string, format: string) {
  let formattedStartDate = "$INVALID_DATE";
  switch (startDate) {
    case "today":
      formattedStartDate = dayjs().format(format);
      break;
    case "yesterday":
      formattedStartDate = dayjs().subtract(1, "day").format(format);
      break;
    case "tomorrow":
      formattedStartDate = dayjs().add(1, "day").format(format);
      break;
    default:
      throw new Error(
        "Error: invalid startDate, please use only: 'today', 'tomorrow', 'yesterday'"
      );
  }
  return formattedStartDate;
}
