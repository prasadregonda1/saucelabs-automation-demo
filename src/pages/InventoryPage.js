const InventoryLocators = require('../objects/InventoryLocators');

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryItems = page.locator(InventoryLocators.inventoryItem);
    this.cartBadge = page.locator(InventoryLocators.cartBadge);
    this.cartLink = page.locator(InventoryLocators.cartLink);
    this.sortDropdown = page.locator(InventoryLocators.sortDropdown);
  }

  async getItemCount() {
    return this.inventoryItems.count();
  }

  async addItemToCartByName(itemName) {
    const item = this.page.locator(InventoryLocators.inventoryItem).filter({ hasText: itemName });
    await item.locator(InventoryLocators.addToCartButton).click();
  }

  async removeItemFromCartByName(itemName) {
    const item = this.page.locator(InventoryLocators.inventoryItem).filter({ hasText: itemName });
    await item.locator(InventoryLocators.removeButton).click();
  }

  async getCartBadgeCount() {
    const isVisible = await this.cartBadge.isVisible();
    if (!isVisible) return 0;
    const text = await this.cartBadge.textContent();
    return parseInt(text, 10);
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async sortProductsBy(option) {
    await this.sortDropdown.selectOption(option);
  }

  async getFirstItemName() {
    return this.page.locator(InventoryLocators.inventoryItemName).first().textContent();
  }
}

module.exports = InventoryPage;
