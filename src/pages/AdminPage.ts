import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Interface for admin user data
 */
export interface AdminUserData {
  id?: string;
  username: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'inactive' | 'banned';
  firstName?: string;
  lastName?: string;
  lastLogin?: string;
  createdAt?: string;
}

/**
 * Interface for admin product data
 */
export interface AdminProductData {
  id?: string;
  name: string;
  sku: string;
  price: number;
  category: string;
  stock: number;
  status: 'active' | 'inactive' | 'discontinued';
  description?: string;
}

/**
 * Interface for admin order data
 */
export interface AdminOrderData {
  id?: string;
  orderNumber: string;
  customerEmail: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  orderDate: string;
  items?: number;
}

/**
 * Admin Page Object Model for the e-shop application
 *
 * This class handles all administrative functionality including
 * user management, product management, order management, and system settings.
 */
export class AdminPage extends BasePage {
  // Navigation menu locators
  private readonly adminNavigation: Locator;
  private readonly dashboardTab: Locator;
  private readonly usersTab: Locator;
  private readonly productsTab: Locator;
  private readonly ordersTab: Locator;
  private readonly settingsTab: Locator;
  private readonly reportsTab: Locator;

  // Dashboard elements
  private readonly totalUsersCard: Locator;
  private readonly totalOrdersCard: Locator;
  private readonly totalRevenueCard: Locator;
  private readonly pendingOrdersCard: Locator;
  private readonly recentOrdersList: Locator;

  // User management elements
  private readonly userTable: Locator;
  private readonly userSearchInput: Locator;
  private readonly userFilterDropdown: Locator;
  private readonly addUserButton: Locator;
  private readonly editUserButton: Locator;
  private readonly deleteUserButton: Locator;
  private readonly banUserButton: Locator;
  private readonly userStatusSelect: Locator;
  private readonly userRoleSelect: Locator;

  // Product management elements
  private readonly productTable: Locator;
  private readonly productSearchInput: Locator;
  private readonly productFilterDropdown: Locator;
  private readonly addProductButton: Locator;
  private readonly editProductButton: Locator;
  private readonly deleteProductButton: Locator;
  private readonly productNameInput: Locator;
  private readonly productPriceInput: Locator;
  private readonly productStockInput: Locator;
  private readonly productCategorySelect: Locator;
  private readonly productStatusSelect: Locator;

  // Order management elements
  private readonly orderTable: Locator;
  private readonly orderSearchInput: Locator;
  private readonly orderFilterDropdown: Locator;
  private readonly orderStatusSelect: Locator;
  private readonly updateOrderButton: Locator;
  private readonly viewOrderButton: Locator;
  private readonly printInvoiceButton: Locator;
  private readonly refundOrderButton: Locator;

  // Form elements
  private readonly modalDialog: Locator;
  private readonly confirmDialog: Locator;
  private readonly saveButton: Locator;
  private readonly cancelButton: Locator;
  private readonly confirmButton: Locator;
  private readonly closeModalButton: Locator;

  // Pagination and data controls
  private readonly paginationControls: Locator;
  private readonly itemsPerPageSelect: Locator;
  private readonly sortColumnHeaders: Locator;
  private readonly selectAllCheckbox: Locator;
  private readonly bulkActionsDropdown: Locator;

  // Messages and notifications
  private readonly successNotification: Locator;
  private readonly errorNotification: Locator;
  private readonly warningNotification: Locator;
  private readonly loadingSpinner: Locator;

  constructor(page: Page) {
    super(page, 'https://tredgate.com/pmtool/admin');

    // Navigation menu locators
    this.adminNavigation = page.locator('.admin-nav, .admin-sidebar, [data-testid="admin-nav"]');
    this.dashboardTab = page.locator(
      'a[href*="dashboard"], .nav-dashboard, [data-testid="dashboard-tab"]'
    );
    this.usersTab = page.locator('a[href*="users"], .nav-users, [data-testid="users-tab"]');
    this.productsTab = page.locator(
      'a[href*="products"], .nav-products, [data-testid="products-tab"]'
    );
    this.ordersTab = page.locator('a[href*="orders"], .nav-orders, [data-testid="orders-tab"]');
    this.settingsTab = page.locator(
      'a[href*="settings"], .nav-settings, [data-testid="settings-tab"]'
    );
    this.reportsTab = page.locator('a[href*="reports"], .nav-reports, [data-testid="reports-tab"]');

    // Dashboard elements
    this.totalUsersCard = page.locator('.total-users, .users-card, [data-testid="total-users"]');
    this.totalOrdersCard = page.locator(
      '.total-orders, .orders-card, [data-testid="total-orders"]'
    );
    this.totalRevenueCard = page.locator(
      '.total-revenue, .revenue-card, [data-testid="total-revenue"]'
    );
    this.pendingOrdersCard = page.locator(
      '.pending-orders, .pending-card, [data-testid="pending-orders"]'
    );
    this.recentOrdersList = page.locator(
      '.recent-orders, .orders-list, [data-testid="recent-orders"]'
    );

    // User management elements
    this.userTable = page.locator(
      '.users-table, table[data-table="users"], [data-testid="users-table"]'
    );
    this.userSearchInput = page.locator(
      '.users-search, input[placeholder*="Search users"], [data-testid="users-search"]'
    );
    this.userFilterDropdown = page.locator(
      '.users-filter, select[name="user-filter"], [data-testid="users-filter"]'
    );
    this.addUserButton = page.locator(
      '.add-user, button:has-text("Add User"), [data-testid="add-user"]'
    );
    this.editUserButton = page.locator('.edit-user, .btn-edit, [data-testid="edit-user"]');
    this.deleteUserButton = page.locator('.delete-user, .btn-delete, [data-testid="delete-user"]');
    this.banUserButton = page.locator('.ban-user, .btn-ban, [data-testid="ban-user"]');
    this.userStatusSelect = page.locator(
      '.user-status, select[name="status"], [data-testid="user-status"]'
    );
    this.userRoleSelect = page.locator(
      '.user-role, select[name="role"], [data-testid="user-role"]'
    );

    // Product management elements
    this.productTable = page.locator(
      '.products-table, table[data-table="products"], [data-testid="products-table"]'
    );
    this.productSearchInput = page.locator(
      '.products-search, input[placeholder*="Search products"], [data-testid="products-search"]'
    );
    this.productFilterDropdown = page.locator(
      '.products-filter, select[name="product-filter"], [data-testid="products-filter"]'
    );
    this.addProductButton = page.locator(
      '.add-product, button:has-text("Add Product"), [data-testid="add-product"]'
    );
    this.editProductButton = page.locator('.edit-product, .btn-edit, [data-testid="edit-product"]');
    this.deleteProductButton = page.locator(
      '.delete-product, .btn-delete, [data-testid="delete-product"]'
    );
    this.productNameInput = page.locator(
      '#product-name, input[name="name"], [data-testid="product-name"]'
    );
    this.productPriceInput = page.locator(
      '#product-price, input[name="price"], [data-testid="product-price"]'
    );
    this.productStockInput = page.locator(
      '#product-stock, input[name="stock"], [data-testid="product-stock"]'
    );
    this.productCategorySelect = page.locator(
      '#product-category, select[name="category"], [data-testid="product-category"]'
    );
    this.productStatusSelect = page.locator(
      '#product-status, select[name="status"], [data-testid="product-status"]'
    );

    // Order management elements
    this.orderTable = page.locator(
      '.orders-table, table[data-table="orders"], [data-testid="orders-table"]'
    );
    this.orderSearchInput = page.locator(
      '.orders-search, input[placeholder*="Search orders"], [data-testid="orders-search"]'
    );
    this.orderFilterDropdown = page.locator(
      '.orders-filter, select[name="order-filter"], [data-testid="orders-filter"]'
    );
    this.orderStatusSelect = page.locator(
      '.order-status, select[name="order-status"], [data-testid="order-status"]'
    );
    this.updateOrderButton = page.locator(
      '.update-order, button:has-text("Update"), [data-testid="update-order"]'
    );
    this.viewOrderButton = page.locator('.view-order, .btn-view, [data-testid="view-order"]');
    this.printInvoiceButton = page.locator(
      '.print-invoice, button:has-text("Print"), [data-testid="print-invoice"]'
    );
    this.refundOrderButton = page.locator(
      '.refund-order, button:has-text("Refund"), [data-testid="refund-order"]'
    );

    // Form elements
    this.modalDialog = page.locator('.modal, .dialog, [data-testid="modal"]');
    this.confirmDialog = page.locator(
      '.confirm-dialog, .confirmation, [data-testid="confirm-dialog"]'
    );
    this.saveButton = page.locator('.save-btn, button:has-text("Save"), [data-testid="save"]');
    this.cancelButton = page.locator(
      '.cancel-btn, button:has-text("Cancel"), [data-testid="cancel"]'
    );
    this.confirmButton = page.locator(
      '.confirm-btn, button:has-text("Confirm"), [data-testid="confirm"]'
    );
    this.closeModalButton = page.locator('.close-modal, .modal-close, [data-testid="close-modal"]');

    // Pagination and data controls
    this.paginationControls = page.locator(
      '.pagination, .page-controls, [data-testid="pagination"]'
    );
    this.itemsPerPageSelect = page.locator(
      '.items-per-page, select[name="per-page"], [data-testid="per-page"]'
    );
    this.sortColumnHeaders = page.locator(
      '.sortable, th[data-sortable], [data-testid="sortable-header"]'
    );
    this.selectAllCheckbox = page.locator(
      '.select-all, input[name="select-all"], [data-testid="select-all"]'
    );
    this.bulkActionsDropdown = page.locator(
      '.bulk-actions, select[name="bulk-action"], [data-testid="bulk-actions"]'
    );

    // Messages and notifications
    this.successNotification = page.locator(
      '.notification.success, .alert-success, [data-testid="success-notification"]'
    );
    this.errorNotification = page.locator(
      '.notification.error, .alert-error, [data-testid="error-notification"]'
    );
    this.warningNotification = page.locator(
      '.notification.warning, .alert-warning, [data-testid="warning-notification"]'
    );
    this.loadingSpinner = page.locator('.loading-spinner, .spinner, [data-testid="loading"]');
  }

  /**
   * Navigate to the admin dashboard
   */
  async goto(): Promise<void> {
    await super.goto();
    await this.waitForPageLoad();
    await this.verifyAdminPageLoaded();
  }

  /**
   * Verify that the admin page has loaded properly
   */
  async verifyAdminPageLoaded(): Promise<void> {
    await expect(this.adminNavigation).toBeVisible();
    await expect(this.dashboardTab).toBeVisible();
  }

  /**
   * Navigate to dashboard tab
   */
  async goToDashboard(): Promise<void> {
    await this.clickElement(this.dashboardTab);
    await this.waitForPageLoad();
  }

  /**
   * Navigate to users management tab
   */
  async goToUsersManagement(): Promise<void> {
    await this.clickElement(this.usersTab);
    await this.waitForPageLoad();
    await this.waitForTableToLoad(this.userTable);
  }

  /**
   * Navigate to products management tab
   */
  async goToProductsManagement(): Promise<void> {
    await this.clickElement(this.productsTab);
    await this.waitForPageLoad();
    await this.waitForTableToLoad(this.productTable);
  }

  /**
   * Navigate to orders management tab
   */
  async goToOrdersManagement(): Promise<void> {
    await this.clickElement(this.ordersTab);
    await this.waitForPageLoad();
    await this.waitForTableToLoad(this.orderTable);
  }

  /**
   * Wait for a data table to load completely
   */
  async waitForTableToLoad(table: Locator): Promise<void> {
    await table.waitFor({ state: 'visible' });

    // Wait for loading spinner to disappear
    try {
      await this.loadingSpinner.waitFor({ state: 'hidden', timeout: 10000 });
    } catch {
      // Loading spinner might not be present
    }
  }

  // === DASHBOARD METHODS ===

  /**
   * Get dashboard statistics
   */
  async getDashboardStats(): Promise<{
    totalUsers: number;
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
  }> {
    const totalUsers = parseInt(await this.getText(this.totalUsersCard)) || 0;
    const totalOrders = parseInt(await this.getText(this.totalOrdersCard)) || 0;
    const revenueText = await this.getText(this.totalRevenueCard);
    const totalRevenue = parseFloat(revenueText.replace(/[^\d.]/g, '')) || 0;
    const pendingOrders = parseInt(await this.getText(this.pendingOrdersCard)) || 0;

    return {
      totalUsers,
      totalOrders,
      totalRevenue,
      pendingOrders,
    };
  }

  // === USER MANAGEMENT METHODS ===

  /**
   * Search for users
   * @param searchTerm - Search term
   */
  async searchUsers(searchTerm: string): Promise<void> {
    await this.fillInput(this.userSearchInput, searchTerm);
    await this.page.keyboard.press('Enter');
    await this.waitForTableToLoad(this.userTable);
  }

  /**
   * Filter users by status or role
   * @param filterType - Type of filter ('status' | 'role')
   * @param filterValue - Filter value
   */
  async filterUsers(filterType: 'status' | 'role', filterValue: string): Promise<void> {
    await this.userFilterDropdown.selectOption({ value: `${filterType}:${filterValue}` });
    await this.waitForTableToLoad(this.userTable);
  }

  /**
   * Add a new user
   * @param userData - User data to add
   */
  async addUser(userData: AdminUserData): Promise<void> {
    await this.clickElement(this.addUserButton);
    await this.waitForLocator(this.modalDialog);

    // Fill user form
    await this.fillInput(this.page.locator('#username'), userData.username);
    await this.fillInput(this.page.locator('#email'), userData.email);
    if (userData.firstName) {
      await this.fillInput(this.page.locator('#firstName'), userData.firstName);
    }
    if (userData.lastName) {
      await this.fillInput(this.page.locator('#lastName'), userData.lastName);
    }

    await this.userRoleSelect.selectOption({ value: userData.role });
    await this.userStatusSelect.selectOption({ value: userData.status });

    await this.clickElement(this.saveButton);
    await this.waitForSuccessNotification();
  }

  /**
   * Edit an existing user
   * @param userId - User ID or email to edit
   * @param updates - Updated user data
   */
  async editUser(userId: string, updates: Partial<AdminUserData>): Promise<void> {
    await this.searchUsers(userId);

    const userRow = this.userTable.locator(`tr:has-text("${userId}")`);
    await this.clickElement(userRow.locator(this.editUserButton));
    await this.waitForLocator(this.modalDialog);

    // Update fields
    if (updates.username) {
      await this.fillInput(this.page.locator('#username'), updates.username);
    }
    if (updates.email) {
      await this.fillInput(this.page.locator('#email'), updates.email);
    }
    if (updates.role) {
      await this.userRoleSelect.selectOption({ value: updates.role });
    }
    if (updates.status) {
      await this.userStatusSelect.selectOption({ value: updates.status });
    }

    await this.clickElement(this.saveButton);
    await this.waitForSuccessNotification();
  }

  /**
   * Delete a user
   * @param userId - User ID or email to delete
   */
  async deleteUser(userId: string): Promise<void> {
    await this.searchUsers(userId);

    const userRow = this.userTable.locator(`tr:has-text("${userId}")`);
    await this.clickElement(userRow.locator(this.deleteUserButton));
    await this.waitForLocator(this.confirmDialog);
    await this.clickElement(this.confirmButton);
    await this.waitForSuccessNotification();
  }

  /**
   * Ban/unban a user
   * @param userId - User ID or email
   * @param ban - True to ban, false to unban
   */
  async banUser(userId: string, ban: boolean = true): Promise<void> {
    await this.searchUsers(userId);

    const userRow = this.userTable.locator(`tr:has-text("${userId}")`);
    await this.clickElement(userRow.locator(this.banUserButton));
    await this.waitForLocator(this.confirmDialog);
    await this.clickElement(this.confirmButton);
    await this.waitForSuccessNotification();
  }

  // === PRODUCT MANAGEMENT METHODS ===

  /**
   * Search for products
   * @param searchTerm - Search term
   */
  async searchProducts(searchTerm: string): Promise<void> {
    await this.fillInput(this.productSearchInput, searchTerm);
    await this.page.keyboard.press('Enter');
    await this.waitForTableToLoad(this.productTable);
  }

  /**
   * Add a new product
   * @param productData - Product data to add
   */
  async addProduct(productData: AdminProductData): Promise<void> {
    await this.clickElement(this.addProductButton);
    await this.waitForLocator(this.modalDialog);

    // Fill product form
    await this.fillInput(this.productNameInput, productData.name);
    await this.fillInput(this.page.locator('#sku'), productData.sku);
    await this.fillInput(this.productPriceInput, productData.price.toString());
    await this.fillInput(this.productStockInput, productData.stock.toString());

    await this.productCategorySelect.selectOption({ value: productData.category });
    await this.productStatusSelect.selectOption({ value: productData.status });

    if (productData.description) {
      await this.fillInput(this.page.locator('#description'), productData.description);
    }

    await this.clickElement(this.saveButton);
    await this.waitForSuccessNotification();
  }

  /**
   * Edit an existing product
   * @param productId - Product ID or SKU to edit
   * @param updates - Updated product data
   */
  async editProduct(productId: string, updates: Partial<AdminProductData>): Promise<void> {
    await this.searchProducts(productId);

    const productRow = this.productTable.locator(`tr:has-text("${productId}")`);
    await this.clickElement(productRow.locator(this.editProductButton));
    await this.waitForLocator(this.modalDialog);

    // Update fields
    if (updates.name) {
      await this.fillInput(this.productNameInput, updates.name);
    }
    if (updates.price) {
      await this.fillInput(this.productPriceInput, updates.price.toString());
    }
    if (updates.stock !== undefined) {
      await this.fillInput(this.productStockInput, updates.stock.toString());
    }
    if (updates.status) {
      await this.productStatusSelect.selectOption({ value: updates.status });
    }

    await this.clickElement(this.saveButton);
    await this.waitForSuccessNotification();
  }

  /**
   * Delete a product
   * @param productId - Product ID or SKU to delete
   */
  async deleteProduct(productId: string): Promise<void> {
    await this.searchProducts(productId);

    const productRow = this.productTable.locator(`tr:has-text("${productId}")`);
    await this.clickElement(productRow.locator(this.deleteProductButton));
    await this.waitForLocator(this.confirmDialog);
    await this.clickElement(this.confirmButton);
    await this.waitForSuccessNotification();
  }

  // === ORDER MANAGEMENT METHODS ===

  /**
   * Search for orders
   * @param searchTerm - Search term (order number, customer email, etc.)
   */
  async searchOrders(searchTerm: string): Promise<void> {
    await this.fillInput(this.orderSearchInput, searchTerm);
    await this.page.keyboard.press('Enter');
    await this.waitForTableToLoad(this.orderTable);
  }

  /**
   * Update order status
   * @param orderNumber - Order number to update
   * @param newStatus - New order status
   */
  async updateOrderStatus(orderNumber: string, newStatus: string): Promise<void> {
    await this.searchOrders(orderNumber);

    const orderRow = this.orderTable.locator(`tr:has-text("${orderNumber}")`);
    await orderRow.locator(this.orderStatusSelect).selectOption({ value: newStatus });
    await this.clickElement(orderRow.locator(this.updateOrderButton));
    await this.waitForSuccessNotification();
  }

  /**
   * View order details
   * @param orderNumber - Order number to view
   */
  async viewOrderDetails(orderNumber: string): Promise<void> {
    await this.searchOrders(orderNumber);

    const orderRow = this.orderTable.locator(`tr:has-text("${orderNumber}")`);
    await this.clickElement(orderRow.locator(this.viewOrderButton));
    await this.waitForPageLoad();
  }

  /**
   * Process refund for an order
   * @param orderNumber - Order number to refund
   */
  async refundOrder(orderNumber: string): Promise<void> {
    await this.searchOrders(orderNumber);

    const orderRow = this.orderTable.locator(`tr:has-text("${orderNumber}")`);
    await this.clickElement(orderRow.locator(this.refundOrderButton));
    await this.waitForLocator(this.confirmDialog);
    await this.clickElement(this.confirmButton);
    await this.waitForSuccessNotification();
  }

  // === UTILITY METHODS ===

  /**
   * Wait for success notification to appear
   */
  async waitForSuccessNotification(): Promise<void> {
    await this.successNotification.waitFor({ state: 'visible', timeout: 10000 });
  }

  /**
   * Wait for error notification and get error message
   */
  async waitForErrorNotification(): Promise<string> {
    await this.errorNotification.waitFor({ state: 'visible', timeout: 10000 });
    return await this.getText(this.errorNotification);
  }

  /**
   * Dismiss notification
   */
  async dismissNotification(): Promise<void> {
    const closeButton = this.page.locator('.notification .close, .alert .close');
    if (await this.isVisible(closeButton)) {
      await this.clickElement(closeButton);
    }
  }

  /**
   * Perform bulk action on selected items
   * @param action - Bulk action to perform
   * @param itemIds - Array of item IDs to select
   */
  async performBulkAction(action: string, itemIds: string[]): Promise<void> {
    // Select items
    for (const id of itemIds) {
      const checkbox = this.page.locator(`tr:has-text("${id}") input[type="checkbox"]`);
      await this.clickElement(checkbox);
    }

    // Perform bulk action
    await this.bulkActionsDropdown.selectOption({ value: action });
    await this.waitForSuccessNotification();
  }

  /**
   * Change items per page setting
   * @param itemsPerPage - Number of items per page
   */
  async changeItemsPerPage(itemsPerPage: number): Promise<void> {
    await this.itemsPerPageSelect.selectOption({ value: itemsPerPage.toString() });
    await this.waitForPageLoad();
  }

  /**
   * Sort table by column
   * @param columnName - Column name to sort by
   */
  async sortTableByColumn(columnName: string): Promise<void> {
    const columnHeader = this.page.locator(`th:has-text("${columnName}")`);
    await this.clickElement(columnHeader);
    await this.waitForTableToLoad(this.userTable);
  }

  /**
   * Verify admin access and permissions
   */
  async verifyAdminPermissions(): Promise<void> {
    await expect(this.usersTab).toBeVisible();
    await expect(this.productsTab).toBeVisible();
    await expect(this.ordersTab).toBeVisible();
    await expect(this.settingsTab).toBeVisible();
  }

  /**
   * Close modal dialog
   */
  async closeModal(): Promise<void> {
    await this.clickElement(this.closeModalButton);
    await this.modalDialog.waitFor({ state: 'hidden' });
  }

  /**
   * Generate test admin data
   */
  static generateTestAdminData(): {
    user: AdminUserData;
    product: AdminProductData;
    order: AdminOrderData;
  } {
    const timestamp = Date.now();

    return {
      user: {
        username: `testuser${timestamp}`,
        email: `test${timestamp}@example.com`,
        role: 'user',
        status: 'active',
        firstName: 'Test',
        lastName: 'User',
      },
      product: {
        name: `Test Product ${timestamp}`,
        sku: `TEST-${timestamp}`,
        price: 99.99,
        category: 'electronics',
        stock: 50,
        status: 'active',
        description: 'Test product description',
      },
      order: {
        orderNumber: `ORD-${timestamp}`,
        customerEmail: `customer${timestamp}@example.com`,
        status: 'pending',
        total: 149.99,
        orderDate: new Date().toISOString().split('T')[0],
        items: 2,
      },
    };
  }
}
