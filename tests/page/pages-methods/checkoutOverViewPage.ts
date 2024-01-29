import { Page } from "@playwright/test";
import CheckoutOverviewLocators from "../pages-locators/checkoutOverviewLocators";

export default class CheckoutOverviewPage {
  private readonly checkoutOverviewLocators: CheckoutOverviewLocators;

  constructor(page: Page) {
    this.checkoutOverviewLocators = new CheckoutOverviewLocators(page);
  }

  public async clickButtonFinish() {
    await this.checkoutOverviewLocators.buttonFinish.click();
  }
}
