Feature: Shopping Cart
  As a user of Sauce Demo
  I want to manage items in my shopping cart
  So that I can purchase the items I want

  Background:
    Given I am logged in as "standard_user" with password "secret_sauce"

  Scenario: View empty cart
    When I navigate to the cart page
    Then the cart should be empty
    And the page title should be "Your Cart"

  Scenario: Add a single item to cart
    Given I am on the inventory page
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1"
    When I navigate to the cart page
    Then the cart should contain "1" item
    And "Sauce Labs Backpack" should be in the cart

  Scenario: Add multiple items to cart
    Given I am on the inventory page
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    And I add "Sauce Labs Bolt T-Shirt" to the cart
    Then the cart badge should show "3"
    When I navigate to the cart page
    Then the cart should contain "3" items

  Scenario: Remove an item from the cart page
    Given I am on the inventory page
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    And I navigate to the cart page
    When I remove "Sauce Labs Backpack" from the cart
    Then the cart should contain "1" item
    And "Sauce Labs Backpack" should not be in the cart
    And "Sauce Labs Bike Light" should be in the cart

  Scenario: Remove all items from cart
    Given I am on the inventory page
    When I add "Sauce Labs Backpack" to the cart
    And I navigate to the cart page
    When I remove "Sauce Labs Backpack" from the cart
    Then the cart should be empty

  Scenario: Verify item details in cart
    Given I am on the inventory page
    When I add "Sauce Labs Backpack" to the cart
    And I navigate to the cart page
    Then "Sauce Labs Backpack" should be in the cart
    And the quantity of "Sauce Labs Backpack" should be "1"
    And the price of "Sauce Labs Backpack" should be "$29.99"

  Scenario: Continue shopping from cart
    Given I am on the inventory page
    When I add "Sauce Labs Backpack" to the cart
    And I navigate to the cart page
    When I click "Continue Shopping"
    Then I should be on the inventory page

  Scenario: Proceed to checkout from cart
    Given I am on the inventory page
    When I add "Sauce Labs Backpack" to the cart
    And I navigate to the cart page
    When I click "Checkout"
    Then I should be on the checkout information page

  Scenario: TC1 - Single item purchase with price verification
    Given I am on the inventory page
    When I add "Sauce Labs Backpack" to the cart
    And I navigate to the cart page
    Then "Sauce Labs Backpack" should be in the cart
    When I click "Checkout"
    And I fill in checkout info with first name "John", last name "Doe", postal code "12345"
    And I click "Continue"
    Then I should see the order summary
    And the total price should equal item price plus tax
    When I click "Finish"
    Then I should see the order confirmation "Thank you for your order!"

  Scenario: TC2 - Two items, remove first, checkout remaining with price verification
    Given I am on the inventory page
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    And I navigate to the cart page
    Then "Sauce Labs Backpack" should be in the cart
    And "Sauce Labs Bike Light" should be in the cart
    When I remove "Sauce Labs Backpack" from the cart
    Then "Sauce Labs Backpack" should not be in the cart
    And "Sauce Labs Bike Light" should be in the cart
    And the cart should contain "1" item
    When I click "Checkout"
    And I fill in checkout info with first name "Jane", last name "Smith", postal code "90210"
    And I click "Continue"
    Then I should see the order summary
    And the total price should equal item price plus tax
    When I click "Finish"
    Then I should see the order confirmation "Thank you for your order!"
