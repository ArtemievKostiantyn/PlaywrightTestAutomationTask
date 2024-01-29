import { Page } from "@playwright/test";
import HeaderLocators from "../pages-locators/headerLocators";

export default class HeaderPage {
  private readonly headerLocators: HeaderLocators;

  constructor(page: Page) {
    this.headerLocators = new HeaderLocators(page);
  }

  async clickShoppingCartButton() {
    await this.headerLocators.shoppingCartButton.click();
  }
}
