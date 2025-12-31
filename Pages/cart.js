import { expect } from '@playwright/test';

export class Cart {

    constructor(page) {
        this.page = page;
        this.cart = page.locator(".title");
        this.itemName = page.locator(".inventory_item_name");
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async cartPageVerification() {
        await expect(this.cart).toHaveText("Your Cart");
    }

    async getAllProductNames() {
        return await this.itemName.allTextContents();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }   



}