import { test, expect } from '@playwright/test';
import { Login } from '../Pages/login.js';
import { Inventory } from '../Pages/inventory.js';
import { Cart } from '../Pages/cart.js';
import { Checkout } from '../Pages/checkout.js';
import checkoutData from '../testData/checkoutInfo.json';
import { CheckoutOverview } from '../Pages/checkoutOverview.js';
import { OrderConfirmation } from '../Pages/orderConfirmation.js';
import { COMMON_STRINGS } from '../comonStrings.js';

test.describe("Automating Sauce Demo end-to-end purchase flow", () => {
    let loginPage;
    let inventoryPage;
    let cartPage;
    let checkoutPage;
    let checkoutOverviewPage;
    let orderConfirmationPage;

    test.beforeAll(async ({ browser, baseURL }) => {

        const context = await browser.newContext();
        const page = await context.newPage();

        loginPage = new Login(page);

        //login to the application
        await page.goto(baseURL);
        await loginPage.loginTheApp(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);

        // Save session state
        await context.storageState({ path: 'auth.json' });
        await context.close(); // closing context
    })

    // reusing that session and fetching from auth.json
    test.use({ storageState: 'auth.json' });

    test('complete e2e purchase: login → add to cart → Fiter → checkout → confirmation', async ({ page }) => {
        const productsToAdd = [
            'sauce-labs-backpack',
            'sauce-labs-fleece-jacket',
            'sauce-labs-bike-light'
        ]

        await page.goto('/inventory.html');
        inventoryPage = new Inventory(page);

        await inventoryPage.inventoryPageVerification();

        //filter price low to high
        await inventoryPage.filterBy("Price (low to high)");
        //getting the prices and verifying they are sorted
        const pricesLowToHigh = await inventoryPage.getAllPrices();
        const sortedPricesLowToHigh = [...pricesLowToHigh].sort((a, b) => a - b);
        expect(pricesLowToHigh).toEqual(sortedPricesLowToHigh);

        //filter price high to low
        await inventoryPage.filterBy("Price (high to low)");
        const pricesHighToLow = await inventoryPage.getAllPrices();
        const sortedPricesHighToLow = [...pricesHighToLow].sort((a, b) => b - a);
        expect(pricesHighToLow).toEqual(sortedPricesHighToLow);


        // adding products to the cart
        await inventoryPage.addProductToCart(productsToAdd);
        await inventoryPage.verifyCartCount(productsToAdd.length);


        await inventoryPage.navigateToCartPage();

        // cart page verification → number of items, items added in cart
        cartPage = new Cart(page);
        await cartPage.cartPageVerification();
        const allProductNames = await cartPage.getAllProductNames();

        expect(allProductNames.length).toBe(productsToAdd.length);
        for (let i = 0; i < productsToAdd.length; i++) {
            expect(allProductNames[i].toLowerCase()).toContain(productsToAdd[i].replace(/-/g, ' '));
        }

        cartPage.proceedToCheckout();

        // checkout page → filling the details
        checkoutPage = new Checkout(page);
        await checkoutPage.fillOutCheckoutInfo(
            checkoutData.firstName,
            checkoutData.lastName,
            checkoutData.postalCode
        );

        await checkoutPage.continueToNextStep();

        // checkout page Overview → Calculating total and finishing the purchase
        checkoutOverviewPage = new CheckoutOverview(page);
        const itemPricesText = await checkoutOverviewPage.getAllPrices();
        // console.log('Item Prices Text:', itemPricesText);

        let priceWithoutText = 0;

        for (const price of itemPricesText) {
            const numericPrice = parseFloat(price.replace('$', ''));
            priceWithoutText += numericPrice;
        }

        // console.log ('Calculated Price Without tax:', priceWithoutText); 

        const displayedItemPrice = await checkoutOverviewPage.getItemTotalPrice();
        expect(displayedItemPrice).toBe(priceWithoutText);

        await checkoutOverviewPage.proceedToFinish();

        //verification of the order completion
        orderConfirmationPage = new OrderConfirmation(page);
        const message = await orderConfirmationPage.verifyOrderCompletion();
        expect(message).toBe(COMMON_STRINGS.ORDER_SUCCESS);

    });

})

