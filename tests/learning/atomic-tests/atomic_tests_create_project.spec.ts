// tests/learning/atomic-tests/
// atomic_tests_create_project.spec.ts
import { expect, test } from "@playwright/test";
import path from "path";
import { CreateNewProjectModal } from "../../../src/pages/pmtool/projects/create_new_project_modal.ts";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test.describe("Atomic Tests: Create Project Modal", () => {
  // ? Z tohoto Page Objectu budou testy začínat
  let createProjectModal: CreateNewProjectModal;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    createProjectModal = await loginPage
      .open()
      .then((login) => login.login("pw_academy", "Playwright321!"))
      .then((dashboard) => dashboard.clickProjects())
      .then((projects) => projects.clickAddProject());
  });

  test("Modal have Structure Elements", async () => {
    await test.step("Modal Header", async () => {
      await expect.soft(createProjectModal.titleHeader).toBeVisible();
      await expect
        .soft(createProjectModal.titleHeader)
        .toHaveText("Project Info");
    });

    await test.step("Info Tab Tests", async () => {
      await expect.soft(createProjectModal.infoTab).toBeVisible();
      await expect.soft(createProjectModal.infoTab).toHaveText("Info");
    });

    await test.step("Priority Select", async () => {
      await expect.soft(createProjectModal.prioritySelect).toBeVisible();
      await expect.soft(createProjectModal.priorityLabel).toBeVisible();
      await expect
        .soft(createProjectModal.priorityLabel)
        .toHaveText("*Priority");
      await expect(createProjectModal.prioritySelect).toHaveValue("34");
      // ? toHaveText nebude fungovat u selectu, protože vždy bere všechny texty z option: UrgentHigh
      await expect(createProjectModal.prioritySelect).toContainText("Urgent");
      await createProjectModal.prioritySelect.selectOption("35");
      await expect(createProjectModal.prioritySelect).toContainText("High");
      await expect(createProjectModal.prioritySelect).toHaveValue("35");
    });

    await test.step("Status Select", async () => {
      await expect.soft(createProjectModal.statusSelect).toBeVisible();
      await expect.soft(createProjectModal.statusLabel).toBeVisible();
      await expect.soft(createProjectModal.statusLabel).toHaveText("*Status");
      await expect.soft(createProjectModal.statusSelect).toContainText("New");
      await expect
        .soft(createProjectModal.statusSelect)
        .toContainText("Waiting");
      await expect
        .soft(createProjectModal.statusSelect)
        .toContainText("Closed");
      await expect.soft(createProjectModal.statusSelect).toContainText("Open");
      await expect
        .soft(createProjectModal.statusSelect)
        .toContainText("Canceled");
      await expect.soft(createProjectModal.statusSelect).toHaveValue("37");
      await createProjectModal.statusSelect.selectOption("38");
      await expect.soft(createProjectModal.statusSelect).toHaveValue("38");
      await createProjectModal.statusSelect.selectOption("39");
      await expect.soft(createProjectModal.statusSelect).toHaveValue("39");
      await createProjectModal.statusSelect.selectOption("40");
      await expect.soft(createProjectModal.statusSelect).toHaveValue("40");
      await createProjectModal.statusSelect.selectOption("41");
      await expect.soft(createProjectModal.statusSelect).toHaveValue("41");
    });

    await test.step("Name Input Tests", async () => {
      await expect.soft(createProjectModal.nameInput).toBeVisible();
      await expect.soft(createProjectModal.nameInput).toBeEnabled();
      await expect.soft(createProjectModal.nameLabel).toBeVisible();
      await expect.soft(createProjectModal.nameLabel).toHaveText("*Name");
    });

    await test.step("Start Date Input Tests", async () => {
      await expect.soft(createProjectModal.startDateInput).toBeVisible();
      await expect.soft(createProjectModal.startDateInput).toBeEnabled();
      await expect.soft(createProjectModal.startDateLabel).toBeVisible();
      await expect
        .soft(createProjectModal.startDateLabel)
        .toHaveText("Start Date");
    });

    await test.step("Buttons Structure Tests", async () => {
      await expect.soft(createProjectModal.attachmentsButton).toBeVisible();
      await expect
        .soft(createProjectModal.attachmentsButton)
        .toHaveText("Add Attachments");
      await expect.soft(createProjectModal.saveButton).toBeVisible();
      await expect.soft(createProjectModal.saveButton).toHaveText("Save");
      await expect.soft(createProjectModal.closeButton).toBeVisible();
      await expect.soft(createProjectModal.closeButton).toHaveText("Close");
    });
  });

  test("Name Input has Validation message", async () => {
    await createProjectModal.triggerNameValidation();
    await expect(createProjectModal.nameValidationLabel).toBeVisible();
    await expect(createProjectModal.nameValidationLabel).toHaveText(
      "This field is required!"
    );
  });

  test("Alert Message Test", async () => {
    await createProjectModal.triggerAlarmMessage();
    await expect(createProjectModal.alertMessageDiv).toBeVisible();
    await expect(createProjectModal.alertMessageDiv).toHaveText(
      "Some fields are required. They have been highlighted above."
    );
  });

  test("Upload File Test", async () => {
    const fileName = "upload_file.txt";
    const filePath = path.resolve(__dirname, "../../../assets/" + fileName);
    //  require("../../../assets") // ? Pomocná kouzelná funkce, která nám pomůže s cestou (našeptává)
    await createProjectModal.uploadFile(filePath);
    await expect(createProjectModal.deleteAttachmentButton).toBeVisible(); // * Je možné test rozšířit o název přílohy, který se vkládá do Pmtool (je potřeba doplnit lokátor do PO)
  });

  test("Click Back Button Test", async () => {
    const projectsPage = await createProjectModal.clickClose();
    await expect(projectsPage.addProjectButton).toBeVisible();
  });

  test("Description iframe Test", async () => {
    await createProjectModal.fillDescription("Test iframe");
    // TODO: add expect to filled description into the Page Object
  });
});
