import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Interface for product data structure
 */
export interface ProductData {
  id?: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
  inStock?: boolean;
  imageUrl?: string;
  sku?: string;
}

/**
 * Interface for product filter options
 */
export interface ProductFilter {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  searchTerm?: string;
  sortBy?: 'name' | 'price' | 'date' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Product Page Object Model for the e-shop application
 *
 * This class handles all product-related functionality including
 * product browsing, searching, filtering, and individual product interactions.
 */
export class ProductPage extends BasePage {
  // Product listing elements
  private readonly productGrid: Locator;
  private readonly productCard: Locator;
  private readonly productTitle: Locator;
  private readonly productPrice: Locator;
  private readonly productImage: Locator;
  private readonly addToCartButton: Locator;
  private readonly quickViewButton: Locator;

  // Product details elements
  private readonly productName: Locator;
  private readonly productDescription: Locator;
  private readonly productSku: Locator;
  private readonly quantityInput: Locator;
  private readonly quantityIncreaseButton: Locator;
  private readonly quantityDecreaseButton: Locator;
  private readonly addToWishlistButton: Locator;

  // Search and filter elements
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly categoryFilter: Locator;
  private readonly priceFilter: Locator;
  private readonly sortDropdown: Locator;
  private readonly filterApplyButton: Locator;
  private readonly clearFiltersButton: Locator;

  // Navigation and pagination
  private readonly paginationNext: Locator;
  private readonly paginationPrev: Locator;
  private readonly paginationNumbers: Locator;
  private readonly resultsCount: Locator;

  // Cart and wishlist
  private readonly cartIcon: Locator;
  private readonly cartBadge: Locator;
  private readonly wishlistIcon: Locator;

  // Loading and messages
  private readonly loadingSpinner: Locator;
  private readonly noResultsMessage: Locator;
  private readonly successMessage: Locator;

  constructor(page: Page) {
    super(page, 'https://tredgate.com/pmtool/products');

    // Product listing locators
    this.productGrid = page.locator(
      '.product-grid, .products-container, [data-testid="product-grid"]'
    );
    this.productCard = page.locator('.product-card, .product-item, [data-testid="product-card"]');
    this.productTitle = page.locator(
      '.product-title, .product-name, h3, [data-testid="product-title"]'
    );
    this.productPrice = page.locator('.product-price, .price, [data-testid="product-price"]');
    this.productImage = page.locator(
      '.product-image img, .product-photo img, [data-testid="product-image"]'
    );
    this.addToCartButton = page.locator(
      '.add-to-cart, button:has-text("Add to Cart"), [data-testid="add-to-cart"]'
    );
    this.quickViewButton = page.locator(
      '.quick-view, button:has-text("Quick View"), [data-testid="quick-view"]'
    );

    // Product details locators
    this.productName = page.locator('.product-detail-name, h1, [data-testid="product-name"]');
    this.productDescription = page.locator(
      '.product-description, .description, [data-testid="product-description"]'
    );
    this.productSku = page.locator('.product-sku, .sku, [data-testid="product-sku"]');
    this.quantityInput = page.locator(
      'input[type="number"], .quantity-input, [data-testid="quantity"]'
    );
    this.quantityIncreaseButton = page.locator(
      '.quantity-increase, .qty-plus, [data-testid="qty-increase"]'
    );
    this.quantityDecreaseButton = page.locator(
      '.quantity-decrease, .qty-minus, [data-testid="qty-decrease"]'
    );
    this.addToWishlistButton = page.locator(
      '.add-to-wishlist, button:has-text("Add to Wishlist"), [data-testid="add-to-wishlist"]'
    );

    // Search and filter locators
    this.searchInput = page.locator('input[type="search"], .search-input, [data-testid="search"]');
    this.searchButton = page.locator(
      '.search-button, button:has-text("Search"), [data-testid="search-button"]'
    );
    this.categoryFilter = page.locator(
      '.category-filter, select[name="category"], [data-testid="category-filter"]'
    );
    this.priceFilter = page.locator('.price-filter, .price-range, [data-testid="price-filter"]');
    this.sortDropdown = page.locator('.sort-dropdown, select[name="sort"], [data-testid="sort"]');
    this.filterApplyButton = page.locator(
      '.apply-filters, button:has-text("Apply"), [data-testid="apply-filters"]'
    );
    this.clearFiltersButton = page.locator(
      '.clear-filters, button:has-text("Clear"), [data-testid="clear-filters"]'
    );

    // Navigation locators
    this.paginationNext = page.locator(
      '.pagination-next, button:has-text("Next"), [data-testid="pagination-next"]'
    );
    this.paginationPrev = page.locator(
      '.pagination-prev, button:has-text("Previous"), [data-testid="pagination-prev"]'
    );
    this.paginationNumbers = page.locator(
      '.pagination-numbers, .page-numbers, [data-testid="pagination-numbers"]'
    );
    this.resultsCount = page.locator(
      '.results-count, .total-results, [data-testid="results-count"]'
    );

    // Cart and wishlist locators
    this.cartIcon = page.locator('.cart-icon, .shopping-cart, [data-testid="cart"]');
    this.cartBadge = page.locator('.cart-badge, .cart-count, [data-testid="cart-count"]');
    this.wishlistIcon = page.locator('.wishlist-icon, .favorites, [data-testid="wishlist"]');

    // Loading and messages
    this.loadingSpinner = page.locator('.loading, .spinner, [data-testid="loading"]');
    this.noResultsMessage = page.locator('.no-results, .empty-results, [data-testid="no-results"]');
    this.successMessage = page.locator('.success-message, .alert-success, [data-testid="success"]');
  }

  /**
   * Navigate to the products page
   */
  async goto(): Promise<void> {
    await super.goto();
    await this.waitForPageLoad();
    await this.waitForProductsToLoad();
  }

  /**
   * Wait for products to load completely
   */
  async waitForProductsToLoad(): Promise<void> {
    await this.productGrid.waitFor({ state: 'visible' });

    // Wait for loading spinner to disappear if present
    try {
      await this.loadingSpinner.waitFor({ state: 'hidden', timeout: 10000 });
    } catch {
      // Spinner might not be present, continue
    }
  }

  /**
   * Search for products by term
   * @param searchTerm - The search term to use
   */
  async searchProducts(searchTerm: string): Promise<void> {
    await this.fillInput(this.searchInput, searchTerm);
    await this.clickElement(this.searchButton);
    await this.waitForProductsToLoad();
  }

  /**
   * Filter products by category
   * @param category - The category to filter by
   */
  async filterByCategory(category: string): Promise<void> {
    await this.clickElement(this.categoryFilter);
    await this.categoryFilter.selectOption({ label: category });
    await this.applyFilters();
  }

  /**
   * Apply price filter
   * @param minPrice - Minimum price
   * @param maxPrice - Maximum price
   */
  async filterByPriceRange(minPrice: number, maxPrice: number): Promise<void> {
    const priceMinInput = this.page.locator('.price-min, input[name="price_min"]');
    const priceMaxInput = this.page.locator('.price-max, input[name="price_max"]');

    if (await this.isVisible(priceMinInput)) {
      await this.fillInput(priceMinInput, minPrice.toString());
    }
    if (await this.isVisible(priceMaxInput)) {
      await this.fillInput(priceMaxInput, maxPrice.toString());
    }
    await this.applyFilters();
  }

  /**
   * Sort products by specified criteria
   * @param sortBy - Sort criteria
   * @param order - Sort order (asc/desc)
   */
  async sortProducts(
    sortBy: 'name' | 'price' | 'date' | 'popularity',
    order: 'asc' | 'desc' = 'asc'
  ): Promise<void> {
    const sortValue = `${sortBy}_${order}`;
    await this.sortDropdown.selectOption({ value: sortValue });
    await this.waitForProductsToLoad();
  }

  /**
   * Apply current filters
   */
  async applyFilters(): Promise<void> {
    if (await this.isVisible(this.filterApplyButton)) {
      await this.clickElement(this.filterApplyButton);
      await this.waitForProductsToLoad();
    }
  }

  /**
   * Clear all active filters
   */
  async clearFilters(): Promise<void> {
    await this.clickElement(this.clearFiltersButton);
    await this.waitForProductsToLoad();
  }

  /**
   * Get all product cards currently displayed
   */
  async getProductCards(): Promise<Locator[]> {
    await this.waitForProductsToLoad();
    const cards = await this.productCard.all();
    return cards;
  }

  /**
   * Get product information from a card
   * @param productCard - The product card locator
   */
  async getProductInfo(productCard: Locator): Promise<ProductData> {
    const name = (await productCard.locator(this.productTitle).textContent()) || '';
    const priceText = (await productCard.locator(this.productPrice).textContent()) || '0';
    const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
    const imageUrl = (await productCard.locator('img').getAttribute('src')) || '';

    return {
      name: name.trim(),
      price,
      imageUrl,
    };
  }

  /**
   * Click on a specific product card to view details
   * @param productIndex - Index of the product to click (0-based)
   */
  async clickProduct(productIndex: number): Promise<void> {
    const products = await this.getProductCards();
    if (productIndex < products.length) {
      await this.clickElement(products[productIndex]);
      await this.waitForPageLoad();
    }
  }

  /**
   * Click on a product by name
   * @param productName - Name of the product to click
   */
  async clickProductByName(productName: string): Promise<void> {
    const productCard = this.page.locator(`.product-card:has-text("${productName}")`);
    await this.clickElement(productCard);
    await this.waitForPageLoad();
  }

  /**
   * Add product to cart by index
   * @param productIndex - Index of the product
   * @param quantity - Quantity to add (default: 1)
   */
  async addProductToCart(productIndex: number, quantity: number = 1): Promise<void> {
    const products = await this.getProductCards();
    if (productIndex < products.length) {
      const addToCartBtn = products[productIndex].locator(this.addToCartButton);
      await this.clickElement(addToCartBtn);
      await this.waitForSuccessMessage();
    }
  }

  /**
   * Add current product to cart (on product detail page)
   * @param quantity - Quantity to add
   */
  async addCurrentProductToCart(quantity: number = 1): Promise<void> {
    if (quantity !== 1) {
      await this.setProductQuantity(quantity);
    }
    await this.clickElement(this.addToCartButton);
    await this.waitForSuccessMessage();
  }

  /**
   * Set product quantity
   * @param quantity - Desired quantity
   */
  async setProductQuantity(quantity: number): Promise<void> {
    await this.fillInput(this.quantityInput, quantity.toString());
  }

  /**
   * Increase product quantity
   * @param times - Number of times to increase (default: 1)
   */
  async increaseQuantity(times: number = 1): Promise<void> {
    for (let i = 0; i < times; i++) {
      await this.clickElement(this.quantityIncreaseButton);
    }
  }

  /**
   * Decrease product quantity
   * @param times - Number of times to decrease (default: 1)
   */
  async decreaseQuantity(times: number = 1): Promise<void> {
    for (let i = 0; i < times; i++) {
      await this.clickElement(this.quantityDecreaseButton);
    }
  }

  /**
   * Add product to wishlist
   */
  async addToWishlist(): Promise<void> {
    await this.clickElement(this.addToWishlistButton);
    await this.waitForSuccessMessage();
  }

  /**
   * Open quick view for a product
   * @param productIndex - Index of the product
   */
  async openQuickView(productIndex: number): Promise<void> {
    const products = await this.getProductCards();
    if (productIndex < products.length) {
      const quickViewBtn = products[productIndex].locator(this.quickViewButton);
      await this.clickElement(quickViewBtn);
    }
  }

  /**
   * Navigate to next page of products
   */
  async goToNextPage(): Promise<void> {
    await this.clickElement(this.paginationNext);
    await this.waitForProductsToLoad();
  }

  /**
   * Navigate to previous page of products
   */
  async goToPreviousPage(): Promise<void> {
    await this.clickElement(this.paginationPrev);
    await this.waitForProductsToLoad();
  }

  /**
   * Navigate to specific page number
   * @param pageNumber - Page number to navigate to
   */
  async goToPage(pageNumber: number): Promise<void> {
    const pageLink = this.page.locator(`.pagination a:has-text("${pageNumber}")`);
    await this.clickElement(pageLink);
    await this.waitForProductsToLoad();
  }

  /**
   * Get current cart count
   */
  async getCartCount(): Promise<number> {
    if (await this.isVisible(this.cartBadge)) {
      const countText = await this.getText(this.cartBadge);
      return parseInt(countText) || 0;
    }
    return 0;
  }

  /**
   * Click on cart icon
   */
  async goToCart(): Promise<void> {
    await this.clickElement(this.cartIcon);
    await this.waitForPageLoad();
  }

  /**
   * Get number of search results
   */
  async getResultsCount(): Promise<number> {
    if (await this.isVisible(this.resultsCount)) {
      const countText = await this.getText(this.resultsCount);
      const match = countText.match(/\d+/);
      return match ? parseInt(match[0]) : 0;
    }
    return 0;
  }

  /**
   * Check if no results message is displayed
   */
  async isNoResultsDisplayed(): Promise<boolean> {
    return await this.isVisible(this.noResultsMessage);
  }

  /**
   * Wait for success message after actions like adding to cart
   */
  async waitForSuccessMessage(): Promise<void> {
    try {
      await this.successMessage.waitFor({ state: 'visible', timeout: 5000 });
    } catch {
      // Success message might not be implemented, continue
    }
  }

  /**
   * Verify product details on detail page
   */
  async verifyProductDetails(): Promise<ProductData> {
    await expect(this.productName).toBeVisible();
    await expect(this.productDescription).toBeVisible();
    await expect(this.productPrice).toBeVisible();

    const name = await this.getText(this.productName);
    const priceText = await this.getText(this.productPrice);
    const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
    const description = await this.getText(this.productDescription);

    return {
      name: name.trim(),
      price,
      description: description.trim(),
    };
  }

  /**
   * Apply multiple filters at once
   * @param filters - Filter object containing multiple filter criteria
   */
  async applyMultipleFilters(filters: ProductFilter): Promise<void> {
    if (filters.searchTerm) {
      await this.fillInput(this.searchInput, filters.searchTerm);
    }

    if (filters.category) {
      await this.filterByCategory(filters.category);
    }

    if (filters.priceMin !== undefined && filters.priceMax !== undefined) {
      await this.filterByPriceRange(filters.priceMin, filters.priceMax);
    }

    if (filters.sortBy) {
      await this.sortProducts(filters.sortBy, filters.sortOrder);
    }

    await this.applyFilters();
  }
}
