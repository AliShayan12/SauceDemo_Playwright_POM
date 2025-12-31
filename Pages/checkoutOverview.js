export class CheckoutOverview {
    constructor(page) {
        this.page = page;
        this.itemPrice = page.locator('.inventory_item_price');
        this.totalSubTotal = page.locator('.summary_subtotal_label');
        this.finishButton = page.locator('[data-test="finish"]');
    }

    async getAllPrices() {
        return await this.itemPrice.allTextContents();
    }

    async getItemTotalPrice() {
        const priceWihtoutTax = await this.totalSubTotal.textContent();
        return parseFloat(priceWihtoutTax.replace('Item total: $', ''));
    }

    async proceedToFinish() {
        await this.finishButton.click();
    }


}