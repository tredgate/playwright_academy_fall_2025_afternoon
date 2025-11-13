# E-Shop Playwright Page Object Model (POM) Documentation

## Table of Contents

1. [Overview](#overview)
2. [Installation & Setup](#installation--setup)
3. [Architecture](#architecture)
4. [Page Objects](#page-objects)
   - [BasePage](#basepage)
   - [LoginPage](#loginpage)
   - [ProductPage](#productpage)
   - [RegistrationPage](#registrationpage)
   - [AdminPage](#adminpage)
5. [Usage Examples](#usage-examples)
6. [Best Practices](#best-practices)
7. [Testing Guidelines](#testing-guidelines)
8. [API Reference](#api-reference)

## Overview

This Page Object Model (POM) library provides a robust, maintainable framework for automated testing of an e-shop application using Playwright. The library follows industry best practices and provides reusable components for common e-commerce testing scenarios.

### Key Features

- **🏗️ Robust Architecture**: Built on a solid base class with shared functionality
- **🔄 Reusable Components**: Modular design for maximum code reuse
- **📝 Type Safety**: Full TypeScript support with comprehensive type definitions
- **🎯 E-Commerce Focused**: Specialized for online shopping applications
- **🧪 Test-Ready**: Designed specifically for automated testing scenarios
- **📚 Well Documented**: Comprehensive documentation and examples

## Installation & Setup

### Prerequisites

- Node.js 16+
- Playwright Test Framework
- TypeScript support

### Setup

1. Install dependencies:

```bash
npm install @playwright/test @types/node
```

2. Configure Playwright (playwright.config.ts):

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://tredgate.com/pmtool',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

3. Import the page objects in your tests:

```typescript
import { PageFactory, LoginPage, ProductPage } from '../src/pages';
```

## Architecture

The POM library follows a hierarchical structure:

```
src/pages/
├── BasePage.ts           # Base class with common functionality
├── LoginPage.ts          # Login/authentication functionality
├── ProductPage.ts        # Product browsing and management
├── RegistrationPage.ts   # User registration functionality
├── AdminPage.ts          # Administrative features
└── index.ts              # Exports and PageFactory
```

### Design Principles

- **Inheritance**: All page objects extend BasePage for shared functionality
- **Encapsulation**: Page-specific logic is contained within each page object
- **Abstraction**: Complex operations are simplified into easy-to-use methods
- **Type Safety**: TypeScript interfaces ensure data consistency

## Page Objects

### BasePage

The foundation class providing common functionality for all page objects.

#### Key Features:

- Navigation utilities
- Element interaction helpers
- Wait strategies
- Screenshot capabilities
- URL management

#### Common Methods:

```typescript
await page.goto(url); // Navigate to URL
await page.waitForLocator(locator); // Wait for element
await page.fillInput(locator, value); // Fill form input
await page.clickElement(locator); // Click element
await page.getText(locator); // Get element text
await page.isVisible(locator); // Check visibility
```

### LoginPage

Handles user authentication and login workflows.

#### Key Features:

- Form validation
- Error handling
- Session management
- Quick login methods

#### Usage Examples:

```typescript
const loginPage = new LoginPage(page);

// Basic login
await loginPage.goto();
await loginPage.login('username', 'password');

// Quick login with defaults
await loginPage.loginWithDefaults();

// Login with validation
await loginPage.loginAndWaitForNavigation('user', 'pass', /dashboard/);

// Verify login errors
await loginPage.loginWithInvalidCredentials('wrong', 'credentials');
await loginPage.verifyErrorMessage('Invalid credentials');
```

#### Available Methods:

- `goto()` - Navigate to login page
- `login(username, password, remember?)` - Complete login process
- `loginWithDefaults()` - Login with test credentials
- `loginAndWaitForNavigation()` - Login and wait for redirect
- `verifyLoginPageElements()` - Validate page structure
- `logout()` - Sign out user
- `isLoggedIn()` - Check authentication status

### ProductPage

Manages product browsing, searching, and shopping cart functionality.

#### Key Features:

- Product search and filtering
- Shopping cart operations
- Product detail views
- Pagination support
- Wishlist management

#### Usage Examples:

```typescript
const productPage = new ProductPage(page);

// Browse products
await productPage.goto();
await productPage.searchProducts('laptop');
await productPage.filterByCategory('Electronics');
await productPage.sortProducts('price', 'asc');

// Product interactions
await productPage.clickProductByName('MacBook Pro');
await productPage.addCurrentProductToCart(2);
await productPage.addToWishlist();

// Cart management
const cartCount = await productPage.getCartCount();
await productPage.goToCart();
```

#### Interface Types:

```typescript
interface ProductData {
  name: string;
  price: number;
  description?: string;
  category?: string;
  inStock?: boolean;
  imageUrl?: string;
  sku?: string;
}

interface ProductFilter {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  searchTerm?: string;
  sortBy?: 'name' | 'price' | 'date' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}
```

### RegistrationPage

Handles new user registration and account creation.

#### Key Features:

- Multi-step form handling
- Field validation
- Terms acceptance
- Email verification
- Test data generation

#### Usage Examples:

```typescript
const registrationPage = new RegistrationPage(page);

// Full registration
const userData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'SecurePass123!',
  confirmPassword: 'SecurePass123!',
  acceptTerms: true,
};
await registrationPage.goto();
await registrationPage.register(userData);

// Quick registration
await registrationPage.quickRegister('test@example.com', 'password123');

// Generate test data
const testUser = RegistrationPage.generateTestUserData();
await registrationPage.register(testUser);
```

#### Interface Types:

```typescript
interface RegistrationData {
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
```

### AdminPage

Provides administrative functionality for managing the e-shop.

#### Key Features:

- User management
- Product management
- Order processing
- Dashboard analytics
- Bulk operations

#### Usage Examples:

```typescript
const adminPage = new AdminPage(page);

// Navigation
await adminPage.goto();
await adminPage.goToUsersManagement();

// User management
await adminPage.addUser({
  username: 'newuser',
  email: 'newuser@example.com',
  role: 'user',
  status: 'active',
});

// Product management
await adminPage.goToProductsManagement();
await adminPage.searchProducts('iPhone');
await adminPage.editProduct('IPHONE-001', { price: 999 });

// Order management
await adminPage.goToOrdersManagement();
await adminPage.updateOrderStatus('ORD-123', 'shipped');
```

## Usage Examples

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';
import { PageFactory } from '../src/pages';

test.describe('E-Shop Tests', () => {
  test('User can login and purchase product', async ({ page }) => {
    const { loginPage, productPage } = PageFactory.createPages(page);

    // Login
    await loginPage.goto();
    await loginPage.loginWithDefaults();
    expect(await loginPage.isLoggedIn()).toBeTruthy();

    // Shop
    await productPage.goto();
    await productPage.addProductToCart(0); // Add first product

    const cartCount = await productPage.getCartCount();
    expect(cartCount).toBeGreaterThan(0);
  });
});
```

### Advanced Test Scenarios

```typescript
test('Complete user journey', async ({ page }) => {
  const pages = PageFactory.createPages(page);

  // Registration
  const userData = RegistrationPage.generateTestUserData();
  await pages.registrationPage.goto();
  await pages.registrationPage.register(userData);
  await pages.registrationPage.verifySuccessfulRegistration();

  // Login with new account
  await pages.loginPage.goto();
  await pages.loginPage.login(userData.email, userData.password);

  // Shopping
  await pages.productPage.goto();
  await pages.productPage.searchProducts('laptop');
  await pages.productPage.filterByPriceRange(500, 1500);
  await pages.productPage.addProductToCart(0, 2);
  await pages.productPage.goToCart();
});
```

### Page Factory Usage

```typescript
// Create all pages at once
const pages = PageFactory.createPages(page);

// Create specific page
const loginPage = PageFactory.createPage(page, 'loginPage');

// Use in test hooks
test.beforeEach(async ({ page }) => {
  const { loginPage } = PageFactory.createPages(page);
  await loginPage.goto();
  await loginPage.loginWithDefaults();
});
```

## Best Practices

### 1. Page Object Design

- **Single Responsibility**: Each page object should handle only one page or feature
- **Stable Locators**: Use data-testid attributes for reliable element identification
- **Defensive Programming**: Include waits and validations in methods
- **Return Values**: Methods should return meaningful data when possible

### 2. Test Organization

```typescript
// Good: Descriptive test names
test('User can add product to cart and proceed to checkout', async ({ page }) => {
  // Test implementation
});

// Good: Use page objects consistently
const { loginPage, productPage } = PageFactory.createPages(page);

// Good: Setup and teardown
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});
```

### 3. Error Handling

```typescript
// Handle expected failures gracefully
try {
  await loginPage.login('invalid', 'credentials');
} catch (error) {
  await loginPage.verifyErrorMessage('Invalid login');
}

// Use assertions for validations
await expect(productPage.getCartCount()).resolves.toBeGreaterThan(0);
```

### 4. Data Management

```typescript
// Use test data generation
const testUser = RegistrationPage.generateTestUserData();

// Use environment variables for sensitive data
const adminCredentials = {
  username: process.env.ADMIN_USERNAME!,
  password: process.env.ADMIN_PASSWORD!,
};
```

## Testing Guidelines

### Test Categories

#### 1. Smoke Tests

- Basic page loading
- Critical user paths
- Core functionality

```typescript
test.describe('Smoke Tests', () => {
  test('Login page loads correctly', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.verifyLoginPageElements();
  });
});
```

#### 2. Functional Tests

- Feature-specific testing
- Form validation
- Business logic

```typescript
test.describe('Product Management', () => {
  test('User can search and filter products', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.goto();
    await productPage.searchProducts('laptop');
    await productPage.filterByCategory('Electronics');

    const resultsCount = await productPage.getResultsCount();
    expect(resultsCount).toBeGreaterThan(0);
  });
});
```

#### 3. Integration Tests

- Cross-page workflows
- End-to-end scenarios
- Data persistence

#### 4. Admin Tests

- Administrative functions
- User management
- System configuration

### Test Data Strategy

#### Static Test Data

```typescript
const TEST_USERS = {
  VALID_USER: { username: 'testuser', password: 'password123' },
  ADMIN_USER: { username: 'admin', password: 'adminpass' },
};
```

#### Dynamic Test Data

```typescript
// Generate unique test data
const uniqueUser = RegistrationPage.generateTestUserData(Date.now());
```

#### Test Data Cleanup

```typescript
test.afterEach(async ({ page }) => {
  // Cleanup test data if needed
  const adminPage = new AdminPage(page);
  // ... cleanup operations
});
```

## API Reference

### BasePage Methods

| Method                                   | Parameters                                              | Returns            | Description      |
| ---------------------------------------- | ------------------------------------------------------- | ------------------ | ---------------- |
| `goto(url?)`                             | `url?: string`                                          | `Promise<void>`    | Navigate to URL  |
| `waitForLocator(locator, timeout?)`      | `locator: Locator, timeout?: number`                    | `Promise<void>`    | Wait for element |
| `fillInput(locator, value, pressEnter?)` | `locator: Locator, value: string, pressEnter?: boolean` | `Promise<void>`    | Fill form input  |
| `clickElement(locator, timeout?)`        | `locator: Locator, timeout?: number`                    | `Promise<void>`    | Click element    |
| `getText(locator)`                       | `locator: Locator`                                      | `Promise<string>`  | Get text content |
| `isVisible(locator)`                     | `locator: Locator`                                      | `Promise<boolean>` | Check visibility |
| `takeScreenshot(fileName?)`              | `fileName?: string`                                     | `Promise<Buffer>`  | Take screenshot  |

### LoginPage Methods

| Method                                 | Parameters                                               | Returns            | Description                 |
| -------------------------------------- | -------------------------------------------------------- | ------------------ | --------------------------- |
| `login(username, password, remember?)` | `username: string, password: string, remember?: boolean` | `Promise<void>`    | Complete login              |
| `loginWithDefaults()`                  | -                                                        | `Promise<void>`    | Login with test credentials |
| `logout()`                             | -                                                        | `Promise<void>`    | Sign out user               |
| `isLoggedIn()`                         | -                                                        | `Promise<boolean>` | Check authentication        |
| `verifyErrorMessage(expected?)`        | `expected?: string`                                      | `Promise<void>`    | Validate error              |

### ProductPage Methods

| Method                               | Parameters                         | Returns                | Description         |
| ------------------------------------ | ---------------------------------- | ---------------------- | ------------------- |
| `searchProducts(searchTerm)`         | `searchTerm: string`               | `Promise<void>`        | Search for products |
| `filterByCategory(category)`         | `category: string`                 | `Promise<void>`        | Filter by category  |
| `addProductToCart(index, quantity?)` | `index: number, quantity?: number` | `Promise<void>`        | Add to cart         |
| `getCartCount()`                     | -                                  | `Promise<number>`      | Get cart item count |
| `getProductInfo(card)`               | `card: Locator`                    | `Promise<ProductData>` | Get product details |

### Error Handling

The library includes comprehensive error handling:

```typescript
// Automatic retries for flaky operations
await page.waitForLocator(locator, { timeout: 30000 });

// Graceful failure handling
if (await page.isVisible(errorLocator)) {
  throw new Error('Page load failed');
}

// Detailed error messages
expect(await productPage.getCartCount(), 'Cart should contain items').toBeGreaterThan(0);
```

## Contributing

When extending this POM library:

1. **Follow Naming Conventions**: Use clear, descriptive method names
2. **Add Type Definitions**: Include TypeScript interfaces for data structures
3. **Document Methods**: Add JSDoc comments for all public methods
4. **Include Examples**: Provide usage examples in documentation
5. **Add Tests**: Test new functionality with example specs
6. **Update Documentation**: Keep this README current with changes

## Support

For issues, questions, or contributions:

- Review the examples in `/tests/examples/`
- Check the TypeScript definitions for available methods
- Refer to the Playwright documentation for underlying functionality

---

This documentation covers the complete POM library for e-shop testing. Use it as a reference for building robust, maintainable automated tests.
