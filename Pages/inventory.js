import { expect } from '@playwright/test';

export class Inventory {
    constructor(page) {
        this.page = page;
        this.productHeading = page.locator('[data-test="title"]');
        this.cart = page.locator('.shopping_cart_link');
        this.filter = page.locator(".product_sort_container")
        this.priceLocator = page.locator('.inventory_item_price');
    }

    getAddToCartButton(productName) {
        return this.page.locator(`[data-test="add-to-cart-${productName}"]`);
    }

    async inventoryPageVerification() {
        await expect(this.productHeading).toBeVisible();
    }

    async addProductToCart(productName) {
        // checking if it's an array or not
        if (Array.isArray(productName)) {
            for (const product of productName) {
                await this.getAddToCartButton(product).click();
            }
        } else {
            await this.getAddToCartButton(productName).click();
        }
    }

    async verifyCartCount(expectedCount) {
        await expect(this.cart).toHaveText(expectedCount.toString());
    }

    async filterBy(filterToBeApplied) {
        const filterMap = {
            'Name (A to Z)': 'az',
            'Name (Z to A)': 'za',
            'Price (low to high)': 'lohi',
            'Price (high to low)': 'hilo'
        };

        const filterValue = filterMap[filterToBeApplied];

        if (!filterValue) {
            throw new Error(`Invalid filter option: "${filterToBeApplied}"`)
        }

        await this.filter.selectOption(filterValue);
    }

    async getAllPrices() {
        const priceElements = await this.priceLocator.all();
        return await Promise.all(
            priceElements.map(async (element) => {
                const text = await element.textContent();
                // console.log('Price text:', text);
                return parseFloat(text.replace('$', ''));
            })
        );
    }

    async navigateToCartPage(){
        await this.cart.click();
    }
}





