const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');

Given('I am logged in as {string} with password {string}', async function (username, password) {
  const loginPage = new LoginPage(this.page);
  await loginPage.navigate();
  await loginPage.login(username, password);
  await expect(this.page).toHaveURL(/.*inventory.html/);
});

Given('I am on the inventory page', async function () {
  await expect(this.page).toHaveURL(/.*inventory.html/);
});

When('I navigate to the cart page', async function () {
  const cartPage = new CartPage(this.page);
  await cartPage.navigate();
});

When('I add {string} to the cart', async function (itemName) {
  const inventoryPage = new InventoryPage(this.page);
  await inventoryPage.addItemToCartByName(itemName);
});

When('I remove {string} from the cart', async function (itemName) {
  const cartPage = new CartPage(this.page);
  await cartPage.removeItemByName(itemName);
});

When('I click {string}', async function (buttonText) {
  const cartPage = new CartPage(this.page);
  const checkoutPage = new CheckoutPage(this.page);

  if (buttonText === 'Continue Shopping') {
    await cartPage.clickContinueShopping();
  } else if (buttonText === 'Checkout') {
    await cartPage.clickCheckout();
  } else if (buttonText === 'Continue') {
    await checkoutPage.clickContinue();
  } else if (buttonText === 'Finish') {
    await checkoutPage.clickFinish();
  }
});

When('I fill in checkout info with first name {string}, last name {string}, postal code {string}',
  async function (firstName, lastName, postalCode) {
    const checkoutPage = new CheckoutPage(this.page);
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
  }
);

Then('the cart should be empty', async function () {
  const cartPage = new CartPage(this.page);
  const isEmpty = await cartPage.isCartEmpty();
  expect(isEmpty).toBe(true);
});

Then('the page title should be {string}', async function (expectedTitle) {
  const cartPage = new CartPage(this.page);
  const title = await cartPage.getPageTitle();
  expect(title.trim()).toBe(expectedTitle);
});

Then('the cart badge should show {string}', async function (expectedCount) {
  const inventoryPage = new InventoryPage(this.page);
  const count = await inventoryPage.getCartBadgeCount();
  expect(count).toBe(parseInt(expectedCount, 10));
});

Then('the cart should contain {string} item', async function (expectedCount) {
  const cartPage = new CartPage(this.page);
  const count = await cartPage.getCartItemCount();
  expect(count).toBe(parseInt(expectedCount, 10));
});

Then('the cart should contain {string} items', async function (expectedCount) {
  const cartPage = new CartPage(this.page);
  const count = await cartPage.getCartItemCount();
  expect(count).toBe(parseInt(expectedCount, 10));
});

Then('{string} should be in the cart', async function (itemName) {
  const cartPage = new CartPage(this.page);
  const isVisible = await cartPage.isItemInCart(itemName);
  expect(isVisible).toBe(true);
});

Then('{string} should not be in the cart', async function (itemName) {
  const cartPage = new CartPage(this.page);
  const items = await cartPage.getCartItemNames();
  expect(items).not.toContain(itemName);
});

Then('the quantity of {string} should be {string}', async function (itemName, expectedQty) {
  const cartPage = new CartPage(this.page);
  const qty = await cartPage.getItemQuantity(itemName);
  expect(qty.trim()).toBe(expectedQty);
});

Then('the price of {string} should be {string}', async function (itemName, expectedPrice) {
  const cartPage = new CartPage(this.page);
  const price = await cartPage.getItemPrice(itemName);
  expect(price.trim()).toBe(expectedPrice);
});

Then('I should be on the inventory page', async function () {
  await expect(this.page).toHaveURL(/.*inventory.html/);
});

Then('I should be on the checkout information page', async function () {
  await expect(this.page).toHaveURL(/.*checkout-step-one.html/);
});

Then('I should see the order summary', async function () {
  await expect(this.page).toHaveURL(/.*checkout-step-two.html/);
  const checkoutPage = new CheckoutPage(this.page);
  const subtotal = await checkoutPage.getSubtotal();
  expect(subtotal).toContain('Item total');
});

Then('the total price should equal item price plus tax', async function () {
  const checkoutPage = new CheckoutPage(this.page);
  const subtotalText = await checkoutPage.getSubtotal();
  const taxText = await checkoutPage.getTax();
  const totalText = await checkoutPage.getTotal();

  const subtotal = await checkoutPage.parsePriceValue(subtotalText);
  const tax = await checkoutPage.parsePriceValue(taxText);
  const total = await checkoutPage.parsePriceValue(totalText);

  const expectedTotal = parseFloat((subtotal + tax).toFixed(2));
  expect(total).toBe(expectedTotal);
});

Then('I should see the order confirmation {string}', async function (expectedMessage) {
  await expect(this.page).toHaveURL(/.*checkout-complete.html/);
  const checkoutPage = new CheckoutPage(this.page);
  const confirmation = await checkoutPage.getOrderConfirmation();
  expect(confirmation.trim()).toBe(expectedMessage);
});
