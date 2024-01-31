import { Page, Locator } from "@playwright/test";

// Basic PageObject that contains some pure TS functions that should be accessible in any pageObject.
// Also contains 'Header' locators and functions.
// Due to Website header being visible and accessible from most of other pages - we should be able to work with it's functions.
export default abstract class BasePage {
  protected readonly page: Page;

  readonly headerLogo: Locator;
  readonly burgerMenu: Locator;
  readonly shoppingCartButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.headerLogo = page.locator(".app_logo");
    this.burgerMenu = page.locator(".bm-burger-button>button");
    this.shoppingCartButton = page.locator(".shopping_cart_link");
  }

  async clickShoppingCartButton(): Promise<void> {
    await this.shoppingCartButton.click();
  }

  getRandomPositiveNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }

  chaiExpect() {
    return chai.expect;
  }
}
