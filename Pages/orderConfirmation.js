import { expect } from '@playwright/test';

export class OrderConfirmation {
    constructor(page) {
        this.page = page;
        this.thankYouMessage = page.locator('.complete-header');
    }

    async verifyOrderCompletion() {
        await expect(this.thankYouMessage).toBeVisible();
        return await this.thankYouMessage.textContent();
    }
}