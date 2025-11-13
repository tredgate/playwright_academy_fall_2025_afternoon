import { Page, Locator, expect } from '@playwright/test';

/**
 * Base Page Object Model class that provides common functionality
 * for all page objects in the e-shop application.
 *
 * This class contains reusable methods and properties that are shared
 * across different page objects to promote code reusability and maintainability.
 */
export abstract class BasePage {
  readonly page: Page;
  protected baseUrl: string;

  constructor(page: Page, baseUrl: string = 'https://tredgate.com/pmtool') {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  /**
   * Navigate to a specific URL or relative path
   * @param url - Full URL or relative path
   */
  async goto(url?: string): Promise<void> {
    const targetUrl = url || this.baseUrl;
    await this.page.goto(targetUrl);
  }

  /**
   * Wait for a specific locator to be visible
   * @param locator - The locator to wait for
   * @param timeout - Optional timeout in milliseconds
   */
  async waitForLocator(locator: Locator, timeout: number = 30000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Fill an input field and optionally press Enter
   * @param locator - The input field locator
   * @param value - The value to fill
   * @param pressEnter - Whether to press Enter after filling
   */
  async fillInput(locator: Locator, value: string, pressEnter: boolean = false): Promise<void> {
    await this.waitForLocator(locator);
    await locator.fill(value);
    if (pressEnter) {
      await locator.press('Enter');
    }
  }

  /**
   * Click on an element with optional wait
   * @param locator - The element locator
   * @param timeout - Optional timeout in milliseconds
   */
  async clickElement(locator: Locator, timeout: number = 30000): Promise<void> {
    await this.waitForLocator(locator, timeout);
    await locator.click();
  }

  /**
   * Get text content of an element
   * @param locator - The element locator
   * @returns The text content
   */
  async getText(locator: Locator): Promise<string> {
    await this.waitForLocator(locator);
    return (await locator.textContent()) || '';
  }

  /**
   * Check if an element is visible
   * @param locator - The element locator
   * @returns True if visible, false otherwise
   */
  async isVisible(locator: Locator): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Take a screenshot of the current page
   * @param fileName - Optional filename for the screenshot
   */
  async takeScreenshot(fileName?: string): Promise<Buffer> {
    const screenshotName = fileName || `screenshot-${Date.now()}.png`;
    return await this.page.screenshot({ path: screenshotName, fullPage: true });
  }

  /**
   * Scroll to an element
   * @param locator - The element to scroll to
   */
  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Wait for a specific URL pattern
   * @param urlPattern - URL pattern to wait for (can be string or regex)
   */
  async waitForURL(urlPattern: string | RegExp): Promise<void> {
    await this.page.waitForURL(urlPattern);
  }

  /**
   * Get current page URL
   * @returns Current page URL
   */
  getCurrentURL(): string {
    return this.page.url();
  }

  /**
   * Refresh the current page
   */
  async refresh(): Promise<void> {
    await this.page.reload();
  }

  /**
   * Go back in browser history
   */
  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  /**
   * Go forward in browser history
   */
  async goForward(): Promise<void> {
    await this.page.goForward();
  }

  /**
   * Verify page title
   * @param expectedTitle - Expected page title
   */
  async verifyPageTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  /**
   * Handle JavaScript dialogs (alerts, confirms, prompts)
   * @param accept - Whether to accept or dismiss the dialog
   * @param promptText - Text to enter for prompts (optional)
   */
  async handleDialog(accept: boolean = true, promptText?: string): Promise<void> {
    this.page.on('dialog', async dialog => {
      if (promptText && dialog.type() === 'prompt') {
        await dialog.accept(promptText);
      } else if (accept) {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
  }
}
