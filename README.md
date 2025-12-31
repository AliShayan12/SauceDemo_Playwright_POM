
# 🧪 SauceDemo E2E Test Automation Framework | Playwright & POM

Playwright | JavaScript | Page Object Model (POM)

A production-ready end-to-end test automation framework built with Playwright and JavaScript, designed using the Page Object Model (POM) architecture.
This project demonstrates real-world QA automation best practices, covering a complete E2E user journey on the SauceDemo application.

#### 🚀 Built to showcase scalable test design, maintainability, and modern automation techniques.

## 🔍 Why This Project?

This framework is designed as a portfolio project to demonstrate:

1.  Strong understanding of E2E automation architecture

2. Practical use of Playwright for modern web testing

3. Clean separation of concerns using POM

4. Real-world test scenarios from login to checkout

5. Maintainable, reusable, and scalable test code

6. Ideal for QA Automation Engineers, SDET roles, and Playwright-based test projects.


## 📌 Tech Stack & Tools

-  Playwright – Modern E2E testing framework

-  JavaScript (Node.js)

- Page Object Model (POM)

- dotenv – Environment configuration

- JSON – Test data management

- GitHub – Version control

## ✨ Key Features

🧱 Page Object Model (POM) for clean, maintainable code

🔁 Reusable page methods and utilities

🌍 Environment-based configuration using .env

🔐 Authentication state reuse for faster execution

📦 Centralized test data management

📝 Common UI text constants for validation

🧪 Full end-to-end test coverage

🎯 Dynamic locators with parameterization

## 📁 Project Structure
```bash
Saucedemo
├── Pages/                         # Page Object Models
│   ├── login.js                   # Login page object
│   ├── inventory.js               # Inventory page object
│   ├── cart.js                    # Cart page object
│   ├── checkout.js                # Checkout information page
│   ├── checkoutOverview.js        # Order summary page
│   └── orderConfirmation.js       # Order confirmation page
├── tests/                          # Test specifications
│   └── sauceDemo.spec.js          # End-to-end test suite
├── testData/                       # Test data
│   └── checkoutInfo.json          # Checkout user details
├── commonStrings.js                # UI text constants
├── auth.json                       # Stored authentication state
├── .env                            # Environment variables
├── playwright.config.js            # Playwright configuration
└── package.json                    # Project dependencies & scripts

```

## 📦 Installation
```bash

git clone https://github.com/AliShayan12/SauceDemo_Playwright_POM.git
cd Saucedemo
npm install
npx playwright install

```

## 🧪 Test Coverage

The framework validates the complete E2E user journey:

🔐 Login – User authentication

🛒 Product Selection – Adding multiple products to cart

🧾 Cart Verification – Validating cart count and contents

✍️ Checkout Information – Filling user details

👀 Order Review – Reviewing order summary

✅ Order Completion – Completing purchase and confirmation


## 🏗️ Page Object Model
🔑 Login Page (Pages/login.js)

Handles user authentication and login functionality.

🛍️ Inventory Page (Pages/inventory.js)

Manages product listings and dynamic product selection.

🛒 Cart Page (Pages/cart.js)

Handles cart validation and navigation to checkout.

✍️ Checkout Page (Pages/checkout.js)

Manages user information input during checkout.

📋 Checkout Overview Page (Pages/checkoutOverview.js)

Displays order summary and handles final purchase.

🎉 Order Confirmation Page (Pages/orderConfirmation.js)

Verifies successful order placement and confirmation message.


## 🚀 Running Tests
```bash
# Run all tests
npx playwright test

# Run in headed mode
npx playwright test --headed

# Run a specific test file
npx playwright test tests/sauceDemo.spec.js

# Debug mode
npx playwright test --debug

```



## Authors

- [@AliShayan12](https://github.com/AliShayan12)

- [Linkedin - alishayyan5](https://www.linkedin.com/in/alishayyan5/)

## Acknowledgements

 - [📘 Playwright Documentation](https://playwright.dev/)
 - [🧪 SauceDemo – Test application](https://www.saucedemo.com/)


