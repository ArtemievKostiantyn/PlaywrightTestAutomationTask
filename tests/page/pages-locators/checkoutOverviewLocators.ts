import { Locator, Page } from "@playwright/test";

export default class CheckoutOverviewLocators {
  protected readonly page: Page;
  readonly buttonFinish: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buttonFinish = page.locator("[data-test='finish']");
  }
}
