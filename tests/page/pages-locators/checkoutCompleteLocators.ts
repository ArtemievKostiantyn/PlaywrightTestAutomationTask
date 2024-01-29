import { Locator, Page } from "@playwright/test";

export default class CheckoutCompleteLocators {
  protected readonly page: Page;
  readonly completeHeader: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator(".title");
    this.completeHeader = page.locator(".complete-header");
  }
}
