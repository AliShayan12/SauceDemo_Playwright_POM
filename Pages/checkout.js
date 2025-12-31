export class Checkout {
    constructor(page) {
        this.page = page; 
        this.continueButton = page.locator('#continue')
    }

    async fillOutCheckoutInfo(firstName, lastName, postalCode) {
        await this.page.getByPlaceholder('First Name').fill(firstName);
        await this.page.getByPlaceholder('Last Name').fill(lastName);
        await this.page.getByPlaceholder('Zip/Postal Code').fill(postalCode);
    }

    async continueToNextStep() {
        await this.continueButton.click();
    }
  
}