import { Locator, Page } from "@playwright/test";
import { CreateNewProjectModal } from "./projects/create_new_project_modal.ts";

export class ProjectsPage {
  readonly page: Page;
  readonly addProjectButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addProjectButton = page.locator('button[test_id="Add Project"]');
  }

  async clickAddProject() {
    await this.addProjectButton.click();
    return new CreateNewProjectModal(this.page);
  }
}
