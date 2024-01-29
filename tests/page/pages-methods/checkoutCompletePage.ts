import { expect, Page } from "@playwright/test";
import CheckoutCompleteLocators from "../pages-locators/checkoutCompleteLocators";

export default class CheckoutCompletePage {
  private readonly checkoutCompleteLocators: CheckoutCompleteLocators;

  constructor(page: Page) {
    this.checkoutCompleteLocators = new CheckoutCompleteLocators(page);
  }

  public async verifyCurrentPage({ titlePage: expectedTitlePage }) {
    await expect(this.checkoutCompleteLocators.pageTitle).toContainText(expectedTitlePage);
  }
}
