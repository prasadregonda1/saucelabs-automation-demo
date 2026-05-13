const CheckoutLocators = require('../objects/CheckoutLocators');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator(CheckoutLocators.firstNameInput);
    this.lastNameInput = page.locator(CheckoutLocators.lastNameInput);
    this.postalCodeInput = page.locator(CheckoutLocators.postalCodeInput);
    this.continueButton = page.locator(CheckoutLocators.continueButton);
    this.cancelButton = page.locator(CheckoutLocators.cancelButton);
    this.errorMessage = page.locator(CheckoutLocators.errorMessage);
    this.finishButton = page.locator(CheckoutLocators.finishButton);
    this.orderConfirmation = page.locator(CheckoutLocators.orderConfirmation);
    this.summarySubtotal = page.locator(CheckoutLocators.summarySubtotal);
    this.summaryTax = page.locator(CheckoutLocators.summaryTax);
    this.summaryTotal = page.locator(CheckoutLocators.summaryTotal);
  }

  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async clickFinish() {
    await this.finishButton.click();
  }

  async getErrorMessage() {
    return this.errorMessage.textContent();
  }

  async getOrderConfirmation() {
    return this.orderConfirmation.textContent();
  }

  async getSubtotal() {
    return this.summarySubtotal.textContent();
  }

  async getTax() {
    return this.summaryTax.textContent();
  }

  async getTotal() {
    return this.summaryTotal.textContent();
  }

  async parsePriceValue(text) {
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }
}

module.exports = CheckoutPage;
