import { Locator, Page } from "@playwright/test";

export default class HeaderLocators {
  protected readonly page: Page;
  readonly shoppingCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartButton = page.locator(".shopping_cart_link");
  }
}
