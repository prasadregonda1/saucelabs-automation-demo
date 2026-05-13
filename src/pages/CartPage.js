const CartLocators = require('../objects/CartLocators');

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator(CartLocators.cartItem);
    this.checkoutButton = page.locator(CartLocators.checkoutButton);
    this.continueShoppingButton = page.locator(CartLocators.continueShoppingButton);
    this.cartTitle = page.locator(CartLocators.pageTitle);
    this.cartQuantityLabel = page.locator(CartLocators.cartQuantityLabel);
    this.cartDescLabel = page.locator(CartLocators.cartDescLabel);
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/cart.html');
  }

  async getCartItemCount() {
    return this.cartItems.count();
  }

  async getCartItemNames() {
    return this.cartItems.locator(CartLocators.itemName).allTextContents();
  }

  async getCartItemPrices() {
    return this.cartItems.locator(CartLocators.itemPrice).allTextContents();
  }

  async getCartItemQuantities() {
    return this.cartItems.locator(CartLocators.itemQuantity).allTextContents();
  }

  async removeItemByName(itemName) {
    const item = this.cartItems.filter({ hasText: itemName });
    await item.locator(CartLocators.removeButton).click();
  }

  async isItemInCart(itemName) {
    const item = this.cartItems.filter({ hasText: itemName });
    return item.isVisible();
  }

  async getItemDescription(itemName) {
    const item = this.cartItems.filter({ hasText: itemName });
    return item.locator(CartLocators.itemDescription).textContent();
  }

  async getItemPrice(itemName) {
    const item = this.cartItems.filter({ hasText: itemName });
    return item.locator(CartLocators.itemPrice).textContent();
  }

  async getItemQuantity(itemName) {
    const item = this.cartItems.filter({ hasText: itemName });
    return item.locator(CartLocators.itemQuantity).textContent();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }

  async getPageTitle() {
    return this.cartTitle.textContent();
  }

  async isCartEmpty() {
    const count = await this.cartItems.count();
    return count === 0;
  }
}

module.exports = CartPage;
