/**
 * E-shop Playwright Page Object Model (POM) Library
 *
 * This module exports all page object classes for easy importing in tests.
 * It provides a centralized entry point for all page objects used in the e-shop application.
 */

// Base page class
export { BasePage } from './BasePage';

// Page object classes
export { LoginPage } from './LoginPage';
export { ProductPage } from './ProductPage';
export { RegistrationPage } from './RegistrationPage';
export { AdminPage } from './AdminPage';

// Type definitions
export type { ProductData, ProductFilter } from './ProductPage';
export type { RegistrationData } from './RegistrationPage';
export type { AdminUserData, AdminProductData, AdminOrderData } from './AdminPage';

/**
 * Page factory class for creating page object instances
 */
import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { ProductPage } from './ProductPage';
import { RegistrationPage } from './RegistrationPage';
import { AdminPage } from './AdminPage';

export class PageFactory {
  /**
   * Create all page objects for a given page instance
   * @param page - Playwright page instance
   * @returns Object containing all page object instances
   */
  static createPages(page: Page) {
    return {
      loginPage: new LoginPage(page),
      productPage: new ProductPage(page),
      registrationPage: new RegistrationPage(page),
      adminPage: new AdminPage(page),
    };
  }

  /**
   * Create a specific page object
   * @param page - Playwright page instance
   * @param pageType - Type of page to create
   * @returns Page object instance
   */
  static createPage<T extends keyof ReturnType<typeof PageFactory.createPages>>(
    page: Page,
    pageType: T
  ): ReturnType<typeof PageFactory.createPages>[T] {
    const pages = PageFactory.createPages(page);
    return pages[pageType];
  }
}
