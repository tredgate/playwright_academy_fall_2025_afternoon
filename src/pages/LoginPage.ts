import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Login Page Object Model for the e-shop application
 *
 * This class encapsulates all the functionality related to the login page,
 * including user authentication, form validation, and navigation after login.
 */
export class LoginPage extends BasePage {
  // Locators for login form elements
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly logoutButton: Locator;
  private readonly errorMessage: Locator;
  private readonly forgotPasswordLink: Locator;
  private readonly rememberMeCheckbox: Locator;
  private readonly loginTitle: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize locators
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('[type="submit"]');
    this.logoutButton = page.locator('text=Logout, text=Log out, .logout-button, #logout');
    this.errorMessage = page.locator(
      '.error-message, .alert-danger, [data-testid="error-message"]'
    );
    this.forgotPasswordLink = page.locator(
      'text=Forgot Password, text=Forgot your password?, a[href*="forgot"]'
    );
    this.rememberMeCheckbox = page.locator('#remember-me, input[name="remember"]');
    this.loginTitle = page.locator('h1, h2, .login-title, [data-testid="login-title"]');
  }

  /**
   * Navigate to the login page
   */
  async goto(): Promise<void> {
    await super.goto();
    await this.waitForPageLoad();
  }

  /**
   * Verify that we are on the login page
   */
  async verifyLoginPageElements(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  /**
   * Fill username field
   * @param username - The username to enter
   */
  async fillUsername(username: string): Promise<void> {
    await this.fillInput(this.usernameInput, username);
  }

  /**
   * Fill password field
   * @param password - The password to enter
   */
  async fillPassword(password: string): Promise<void> {
    await this.fillInput(this.passwordInput, password);
  }

  /**
   * Click the login button
   */
  async clickLogin(): Promise<void> {
    await this.clickElement(this.loginButton);
  }

  /**
   * Complete login process with credentials
   * @param username - The username to login with
   * @param password - The password to login with
   * @param remember - Whether to check remember me checkbox
   */
  async login(username: string, password: string, remember: boolean = false): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);

    if (remember && (await this.isVisible(this.rememberMeCheckbox))) {
      await this.clickElement(this.rememberMeCheckbox);
    }

    await this.clickLogin();
    await this.waitForPageLoad();
  }

  /**
   * Quick login with default test credentials
   * Useful for test setup and common scenarios
   */
  async loginWithDefaults(): Promise<void> {
    await this.login('pw_academy', 'Playwright321!');
  }

  /**
   * Login and wait for successful navigation
   * @param username - The username to login with
   * @param password - The password to login with
   * @param expectedUrl - URL pattern to wait for after login
   */
  async loginAndWaitForNavigation(
    username: string,
    password: string,
    expectedUrl: string | RegExp = /dashboard|home|main/
  ): Promise<void> {
    await this.login(username, password);
    await this.waitForURL(expectedUrl);
  }

  /**
   * Attempt login with invalid credentials
   * @param username - Invalid username
   * @param password - Invalid password
   */
  async loginWithInvalidCredentials(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  /**
   * Verify error message is displayed
   * @param expectedErrorText - Expected error message (optional)
   */
  async verifyErrorMessage(expectedErrorText?: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();

    if (expectedErrorText) {
      await expect(this.errorMessage).toContainText(expectedErrorText);
    }
  }

  /**
   * Check if user is logged in by looking for logout button
   */
  async isLoggedIn(): Promise<boolean> {
    return await this.isVisible(this.logoutButton);
  }

  /**
   * Logout from the application
   */
  async logout(): Promise<void> {
    if (await this.isVisible(this.logoutButton)) {
      await this.clickElement(this.logoutButton);
      await this.waitForPageLoad();
    }
  }

  /**
   * Click forgot password link
   */
  async clickForgotPassword(): Promise<void> {
    await this.clickElement(this.forgotPasswordLink);
  }

  /**
   * Get the current login page title
   */
  async getLoginTitle(): Promise<string> {
    return await this.getText(this.loginTitle);
  }

  /**
   * Verify specific form validation errors
   * @param field - Field that should have error ('username' | 'password')
   */
  async verifyFieldValidation(field: 'username' | 'password'): Promise<void> {
    const fieldLocator = field === 'username' ? this.usernameInput : this.passwordInput;

    // Check if field has validation styling or attributes
    await expect(fieldLocator).toHaveAttribute('aria-invalid', 'true');
  }

  /**
   * Clear all form fields
   */
  async clearForm(): Promise<void> {
    await this.usernameInput.clear();
    await this.passwordInput.clear();
  }

  /**
   * Get username field value
   */
  async getUsernameValue(): Promise<string> {
    return await this.usernameInput.inputValue();
  }

  /**
   * Get password field value
   */
  async getPasswordValue(): Promise<string> {
    return await this.passwordInput.inputValue();
  }

  /**
   * Check if remember me checkbox is checked
   */
  async isRememberMeChecked(): Promise<boolean> {
    if (await this.isVisible(this.rememberMeCheckbox)) {
      return await this.rememberMeCheckbox.isChecked();
    }
    return false;
  }

  /**
   * Verify login button state
   * @param shouldBeEnabled - Expected button state
   */
  async verifyLoginButtonState(shouldBeEnabled: boolean): Promise<void> {
    if (shouldBeEnabled) {
      await expect(this.loginButton).toBeEnabled();
    } else {
      await expect(this.loginButton).toBeDisabled();
    }
  }
}
