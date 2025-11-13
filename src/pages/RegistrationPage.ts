import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Interface for user registration data
 */
export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  acceptTerms?: boolean;
  newsletter?: boolean;
}

/**
 * Registration Page Object Model for the e-shop application
 *
 * This class handles all user registration functionality including
 * form validation, submission, and error handling.
 */
export class RegistrationPage extends BasePage {
  // Form field locators
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly phoneNumberInput: Locator;
  private readonly dateOfBirthInput: Locator;
  private readonly genderSelect: Locator;

  // Checkbox and radio button locators
  private readonly acceptTermsCheckbox: Locator;
  private readonly newsletterCheckbox: Locator;
  private readonly genderMaleRadio: Locator;
  private readonly genderFemaleRadio: Locator;
  private readonly genderOtherRadio: Locator;

  // Button locators
  private readonly registerButton: Locator;
  private readonly cancelButton: Locator;
  private readonly clearFormButton: Locator;
  private readonly loginLinkButton: Locator;

  // Validation and message locators
  private readonly errorMessages: Locator;
  private readonly fieldErrorMessages: Locator;
  private readonly successMessage: Locator;
  private readonly emailVerificationMessage: Locator;
  private readonly passwordStrengthIndicator: Locator;

  // Form sections
  private readonly personalInfoSection: Locator;
  private readonly accountInfoSection: Locator;
  private readonly preferencesSection: Locator;

  // Links and external elements
  private readonly termsOfServiceLink: Locator;
  private readonly privacyPolicyLink: Locator;

  constructor(page: Page) {
    super(page, 'https://tredgate.com/pmtool/register');

    // Form field locators
    this.firstNameInput = page.locator(
      '#firstName, input[name="firstName"], [data-testid="first-name"]'
    );
    this.lastNameInput = page.locator(
      '#lastName, input[name="lastName"], [data-testid="last-name"]'
    );
    this.emailInput = page.locator(
      '#email, input[name="email"], input[type="email"], [data-testid="email"]'
    );
    this.usernameInput = page.locator(
      '#username, input[name="username"], [data-testid="username"]'
    );
    this.passwordInput = page.locator(
      '#password, input[name="password"], input[type="password"]:first-of-type, [data-testid="password"]'
    );
    this.confirmPasswordInput = page.locator(
      '#confirmPassword, input[name="confirmPassword"], input[name="password_confirmation"], [data-testid="confirm-password"]'
    );
    this.phoneNumberInput = page.locator(
      '#phone, input[name="phone"], input[type="tel"], [data-testid="phone"]'
    );
    this.dateOfBirthInput = page.locator(
      '#dateOfBirth, input[name="dateOfBirth"], input[type="date"], [data-testid="date-of-birth"]'
    );
    this.genderSelect = page.locator(
      '#gender, select[name="gender"], [data-testid="gender-select"]'
    );

    // Checkbox and radio button locators
    this.acceptTermsCheckbox = page.locator(
      '#acceptTerms, input[name="acceptTerms"], [data-testid="accept-terms"]'
    );
    this.newsletterCheckbox = page.locator(
      '#newsletter, input[name="newsletter"], [data-testid="newsletter"]'
    );
    this.genderMaleRadio = page.locator(
      'input[type="radio"][value="male"], [data-testid="gender-male"]'
    );
    this.genderFemaleRadio = page.locator(
      'input[type="radio"][value="female"], [data-testid="gender-female"]'
    );
    this.genderOtherRadio = page.locator(
      'input[type="radio"][value="other"], [data-testid="gender-other"]'
    );

    // Button locators
    this.registerButton = page.locator(
      'button[type="submit"], .register-button, button:has-text("Register"), [data-testid="register-button"]'
    );
    this.cancelButton = page.locator(
      '.cancel-button, button:has-text("Cancel"), [data-testid="cancel-button"]'
    );
    this.clearFormButton = page.locator(
      '.clear-form, button:has-text("Clear"), [data-testid="clear-form"]'
    );
    this.loginLinkButton = page.locator(
      'a[href*="login"], .login-link, [data-testid="login-link"]'
    );

    // Validation and message locators
    this.errorMessages = page.locator(
      '.error-message, .alert-danger, .validation-error, [data-testid="error-message"]'
    );
    this.fieldErrorMessages = page.locator(
      '.field-error, .input-error, .form-error, [data-testid="field-error"]'
    );
    this.successMessage = page.locator(
      '.success-message, .alert-success, [data-testid="success-message"]'
    );
    this.emailVerificationMessage = page.locator(
      '.email-verification, .verification-message, [data-testid="email-verification"]'
    );
    this.passwordStrengthIndicator = page.locator(
      '.password-strength, .strength-indicator, [data-testid="password-strength"]'
    );

    // Form sections
    this.personalInfoSection = page.locator(
      '.personal-info, .section-personal, [data-testid="personal-info"]'
    );
    this.accountInfoSection = page.locator(
      '.account-info, .section-account, [data-testid="account-info"]'
    );
    this.preferencesSection = page.locator(
      '.preferences, .section-preferences, [data-testid="preferences"]'
    );

    // Links
    this.termsOfServiceLink = page.locator(
      'a[href*="terms"], .terms-link, [data-testid="terms-link"]'
    );
    this.privacyPolicyLink = page.locator(
      'a[href*="privacy"], .privacy-link, [data-testid="privacy-link"]'
    );
  }

  /**
   * Navigate to the registration page
   */
  async goto(): Promise<void> {
    await super.goto();
    await this.waitForPageLoad();
    await this.verifyRegistrationPageLoaded();
  }

  /**
   * Verify that the registration page has loaded properly
   */
  async verifyRegistrationPageLoaded(): Promise<void> {
    await expect(this.registerButton).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

  /**
   * Fill personal information section
   * @param firstName - User's first name
   * @param lastName - User's last name
   * @param email - User's email address
   * @param phoneNumber - User's phone number (optional)
   */
  async fillPersonalInfo(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber?: string
  ): Promise<void> {
    await this.fillInput(this.firstNameInput, firstName);
    await this.fillInput(this.lastNameInput, lastName);
    await this.fillInput(this.emailInput, email);

    if (phoneNumber && (await this.isVisible(this.phoneNumberInput))) {
      await this.fillInput(this.phoneNumberInput, phoneNumber);
    }
  }

  /**
   * Fill account information section
   * @param username - Desired username (optional)
   * @param password - Password
   * @param confirmPassword - Password confirmation
   */
  async fillAccountInfo(
    username: string | undefined,
    password: string,
    confirmPassword: string
  ): Promise<void> {
    if (username && (await this.isVisible(this.usernameInput))) {
      await this.fillInput(this.usernameInput, username);
    }

    await this.fillInput(this.passwordInput, password);
    await this.fillInput(this.confirmPasswordInput, confirmPassword);
  }

  /**
   * Fill additional preferences
   * @param dateOfBirth - Date of birth (optional)
   * @param gender - Gender selection (optional)
   * @param acceptTerms - Accept terms and conditions
   * @param newsletter - Subscribe to newsletter
   */
  async fillPreferences(
    dateOfBirth?: string,
    gender?: 'male' | 'female' | 'other',
    acceptTerms: boolean = true,
    newsletter: boolean = false
  ): Promise<void> {
    if (dateOfBirth && (await this.isVisible(this.dateOfBirthInput))) {
      await this.fillInput(this.dateOfBirthInput, dateOfBirth);
    }

    if (gender) {
      await this.selectGender(gender);
    }

    if (acceptTerms && (await this.isVisible(this.acceptTermsCheckbox))) {
      await this.checkTermsAcceptance();
    }

    if (newsletter && (await this.isVisible(this.newsletterCheckbox))) {
      await this.subscribeToNewsletter();
    }
  }

  /**
   * Select gender option
   * @param gender - Gender to select
   */
  async selectGender(gender: 'male' | 'female' | 'other'): Promise<void> {
    // Check if using radio buttons or select dropdown
    if (await this.isVisible(this.genderMaleRadio)) {
      // Using radio buttons
      switch (gender) {
        case 'male':
          await this.clickElement(this.genderMaleRadio);
          break;
        case 'female':
          await this.clickElement(this.genderFemaleRadio);
          break;
        case 'other':
          await this.clickElement(this.genderOtherRadio);
          break;
      }
    } else if (await this.isVisible(this.genderSelect)) {
      // Using select dropdown
      await this.genderSelect.selectOption({ value: gender });
    }
  }

  /**
   * Check the accept terms and conditions checkbox
   */
  async checkTermsAcceptance(): Promise<void> {
    if (!(await this.acceptTermsCheckbox.isChecked())) {
      await this.clickElement(this.acceptTermsCheckbox);
    }
  }

  /**
   * Check the newsletter subscription checkbox
   */
  async subscribeToNewsletter(): Promise<void> {
    if (!(await this.newsletterCheckbox.isChecked())) {
      await this.clickElement(this.newsletterCheckbox);
    }
  }

  /**
   * Complete full registration process
   * @param userData - Complete user registration data
   */
  async register(userData: RegistrationData): Promise<void> {
    await this.fillPersonalInfo(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.phoneNumber
    );

    await this.fillAccountInfo(userData.username, userData.password, userData.confirmPassword);

    await this.fillPreferences(
      userData.dateOfBirth,
      userData.gender,
      userData.acceptTerms,
      userData.newsletter
    );

    await this.submitRegistration();
  }

  /**
   * Submit the registration form
   */
  async submitRegistration(): Promise<void> {
    await this.clickElement(this.registerButton);
    await this.waitForPageLoad();
  }

  /**
   * Quick registration with minimal required data
   * @param email - Email address
   * @param password - Password
   * @param firstName - First name
   * @param lastName - Last name
   */
  async quickRegister(
    email: string,
    password: string,
    firstName: string = 'Test',
    lastName: string = 'User'
  ): Promise<void> {
    const userData: RegistrationData = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword: password,
      acceptTerms: true,
    };

    await this.register(userData);
  }

  /**
   * Clear all form fields
   */
  async clearForm(): Promise<void> {
    if (await this.isVisible(this.clearFormButton)) {
      await this.clickElement(this.clearFormButton);
    } else {
      // Manual clearing of each field
      const fields = [
        this.firstNameInput,
        this.lastNameInput,
        this.emailInput,
        this.usernameInput,
        this.passwordInput,
        this.confirmPasswordInput,
        this.phoneNumberInput,
        this.dateOfBirthInput,
      ];

      for (const field of fields) {
        if (await this.isVisible(field)) {
          await field.clear();
        }
      }
    }
  }

  /**
   * Verify validation errors are displayed
   * @param expectedErrors - Array of expected error messages (optional)
   */
  async verifyValidationErrors(expectedErrors?: string[]): Promise<void> {
    await expect(this.errorMessages.first()).toBeVisible();

    if (expectedErrors) {
      for (const errorText of expectedErrors) {
        await expect(this.page.locator(`.error-message:has-text("${errorText}")`)).toBeVisible();
      }
    }
  }

  /**
   * Verify field-specific validation error
   * @param fieldName - Name of the field with error
   * @param errorMessage - Expected error message (optional)
   */
  async verifyFieldError(fieldName: string, errorMessage?: string): Promise<void> {
    const fieldErrorSelector = `[data-field="${fieldName}"] .field-error, .${fieldName}-error`;
    const fieldError = this.page.locator(fieldErrorSelector);

    await expect(fieldError).toBeVisible();

    if (errorMessage) {
      await expect(fieldError).toContainText(errorMessage);
    }
  }

  /**
   * Verify successful registration
   */
  async verifySuccessfulRegistration(): Promise<void> {
    // Check for success message or redirect to confirmation page
    const hasSuccessMessage = await this.isVisible(this.successMessage);
    const hasEmailVerification = await this.isVisible(this.emailVerificationMessage);
    const isRedirected =
      this.getCurrentURL().includes('success') || this.getCurrentURL().includes('confirm');

    expect(hasSuccessMessage || hasEmailVerification || isRedirected).toBeTruthy();
  }

  /**
   * Verify password strength indicator
   * @param expectedStrength - Expected strength level ('weak', 'medium', 'strong')
   */
  async verifyPasswordStrength(expectedStrength: 'weak' | 'medium' | 'strong'): Promise<void> {
    if (await this.isVisible(this.passwordStrengthIndicator)) {
      await expect(this.passwordStrengthIndicator).toContainText(expectedStrength);
    }
  }

  /**
   * Check if email is already registered
   * @param email - Email to check
   */
  async checkEmailAvailability(email: string): Promise<boolean> {
    await this.fillInput(this.emailInput, email);

    // Trigger validation (usually on blur or after short delay)
    await this.emailInput.blur();
    await this.page.waitForTimeout(1000);

    const emailErrorExists = await this.isVisible(
      this.page.locator('.email-error:has-text("already"), .error:has-text("exists")')
    );

    return !emailErrorExists;
  }

  /**
   * Check if username is available
   * @param username - Username to check
   */
  async checkUsernameAvailability(username: string): Promise<boolean> {
    if (!(await this.isVisible(this.usernameInput))) {
      return true; // Username field not present
    }

    await this.fillInput(this.usernameInput, username);

    // Trigger validation
    await this.usernameInput.blur();
    await this.page.waitForTimeout(1000);

    const usernameErrorExists = await this.isVisible(
      this.page.locator('.username-error:has-text("taken"), .error:has-text("unavailable")')
    );

    return !usernameErrorExists;
  }

  /**
   * Navigate to login page
   */
  async goToLogin(): Promise<void> {
    await this.clickElement(this.loginLinkButton);
    await this.waitForPageLoad();
  }

  /**
   * Open terms of service
   */
  async openTermsOfService(): Promise<void> {
    await this.clickElement(this.termsOfServiceLink);
  }

  /**
   * Open privacy policy
   */
  async openPrivacyPolicy(): Promise<void> {
    await this.clickElement(this.privacyPolicyLink);
  }

  /**
   * Cancel registration and return to previous page
   */
  async cancelRegistration(): Promise<void> {
    await this.clickElement(this.cancelButton);
    await this.waitForPageLoad();
  }

  /**
   * Verify form field requirements
   */
  async verifyRequiredFields(): Promise<void> {
    // Submit empty form to trigger validation
    await this.clickElement(this.registerButton);

    // Verify required field errors
    const requiredFields = [
      this.firstNameInput,
      this.lastNameInput,
      this.emailInput,
      this.passwordInput,
    ];

    for (const field of requiredFields) {
      if (await this.isVisible(field)) {
        await expect(field).toHaveAttribute('required');
      }
    }
  }

  /**
   * Test password confirmation validation
   * @param password - Original password
   * @param confirmPassword - Confirmation password
   */
  async testPasswordConfirmation(password: string, confirmPassword: string): Promise<void> {
    await this.fillInput(this.passwordInput, password);
    await this.fillInput(this.confirmPasswordInput, confirmPassword);
    await this.confirmPasswordInput.blur();

    if (password !== confirmPassword) {
      await expect(this.page.locator('.password-mismatch, .confirm-password-error')).toBeVisible();
    }
  }

  /**
   * Generate test user data
   * @param index - Unique index for generating unique data
   */
  static generateTestUserData(index: number = Date.now()): RegistrationData {
    return {
      firstName: `Test${index}`,
      lastName: `User${index}`,
      email: `testuser${index}@example.com`,
      username: `testuser${index}`,
      password: 'TestPassword123!',
      confirmPassword: 'TestPassword123!',
      phoneNumber: '+1234567890',
      acceptTerms: true,
      newsletter: false,
    };
  }
}
