import { expect, Locator, Page } from "@playwright/test";
import { ProjectTasksPage } from "./project_tasks_page.ts";
import { ProjectsPage } from "../projects_page.ts";

export class CreateNewProjectModal {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly saveButton: Locator;
  readonly titleHeader: Locator;
  readonly infoTab: Locator;
  readonly prioritySelect: Locator;
  readonly priorityLabel: Locator;
  readonly statusSelect: Locator;
  readonly statusLabel: Locator;
  readonly nameLabel: Locator;
  readonly startDateInput: Locator;
  readonly startDateLabel: Locator;
  readonly descriptionLabel: Locator;
  readonly descriptionIframe: string;
  readonly attachmentsButton: Locator;
  readonly attachmentsLabel: Locator;
  readonly closeButton: Locator;
  readonly nameValidationLabel: Locator;
  readonly alertMessageDiv: Locator;
  readonly deleteAttachmentButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('div[data-testid="Name"] input');
    this.saveButton = page.locator('button[type="submit"]');
    this.titleHeader = page.locator("h4.modal-title");
    this.infoTab = page.locator('//ul[@id="form_tabs"]//li[1]');
    this.prioritySelect = page.locator('[data-testid="Priority"] select');
    this.priorityLabel = page.locator(
      '//div[@data-testid="Priority"]/../../label'
    );
    this.statusSelect = page.locator('[data-testid="Status"] select');
    this.statusLabel = page.locator('//div[@data-testid="Status"]/../../label');
    this.nameInput = page.locator('[data-testid="Name"] input');
    this.nameLabel = page.locator('//div[@data-testid="Name"]/../../label');
    this.startDateInput = page.locator('[data-testid="Start Date"] input');
    this.startDateLabel = page.locator(
      '//div[@data-testid="Start Date"]/../../label'
    );
    this.descriptionLabel = page.locator(
      '//div[@data-testid="Description"]/../../label'
    );
    this.descriptionIframe = '[data-testid="Description"] iframe';
    this.attachmentsButton = page.locator(
      '[data-testid="Attachments"] .btn-upload'
    );
    this.attachmentsLabel = page.locator(
      '//div[@data-testid="Attachments"]/../../label'
    );
    this.saveButton = page.locator('[type="submit"]');
    this.closeButton = page.locator(".btn-close");
    this.nameValidationLabel = page.locator('[data-testid="Name"] label.error');
    this.alertMessageDiv = page.locator("#form-error-container div");
    this.deleteAttachmentButton = page.locator(".delete_attachments");
  }

  async fillName(projectName: string) {
    await this.nameInput.fill(projectName);
    return this;
  }

  async clickSave() {
    await this.saveButton.click();
    return new ProjectTasksPage(this.page);
  }

  async clickClose() {
    await this.closeButton.click();
    return new ProjectsPage(this.page);
  }

  async selectPriority(priority: string) {
    await this.prioritySelect.selectOption(priority);
    return this;
  }

  async selectStatus(status: string) {
    await this.statusSelect.selectOption(status);
    return this;
  }

  async selectPriorityByLabel(priorityLabel: string) {
    await this.prioritySelect.selectOption({ label: priorityLabel });
    return this;
  }

  async selectStatusByLabel(statusLabel: string) {
    await this.statusSelect.selectOption({ label: statusLabel });
    return this;
  }

  async fillStartDate(startDate: string) {
    // ? Pro vyplnění tohoto pole potřebujeme použít speciální sekvenci kroků, jinak by se nám datum správně nepropsalo (zobrazuje se okno kalendáře, které vždy má prioritu, pomocí Escape ho zavřeme)
    await this.startDateInput.click();
    await this.startDateInput.press("Escape");
    await this.startDateInput.fill(startDate);
    return this;
  }

  async fillDescription(description: string) {
    const iframe = this.page.frameLocator(this.descriptionIframe);
    await iframe.locator("body").fill(description);
    return this;
  }

  async uploadFile(filePath: string) {
    const fileChooserPromise = this.page.waitForEvent("filechooser");
    await this.attachmentsButton.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
    await expect(this.deleteAttachmentButton).toBeVisible();
    return this;
  }

  async triggerNameValidation() {
    // ! Čištění pole name (bez vyčištění hrozí to, že se nám projekt uloží, pokud bude pole name vyplněné.)
    await this.nameInput.clear();
    await expect(
      this.nameInput,
      "Assert Name Input Value is not Filled"
    ).toHaveValue("");
    await this.saveButton.click();
    return this;
  }

  // ? Toto je duplicitní metoda k triggerNameValidation(), dělá to samé. Cílem této metody je ale pomoci při psaní testů se srozumitelností PO - když bude tester hledat metodu na zobrazení error hlášky, tak nebude hledat: triggerNameValidation a to může vést k problémům.
  async triggerAlarmMessage() {
    await this.triggerNameValidation();
    return this;
  }
}
