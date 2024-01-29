import { Locator, Page } from "@playwright/test";

export default class CheckoutInformationLocators {
  protected readonly page: Page;
  readonly pageTitle: Locator;
  readonly checkoutInformationContainer: Locator;
  readonly inputFirstName: Locator;
  readonly inputLastName: Locator;
  readonly inputPostalCode: Locator;
  readonly buttonContinue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator(".title");
    this.checkoutInformationContainer = page.locator("#checkout_info_container");
    this.inputFirstName = page.locator("[data-test='firstName']");
    this.inputLastName = page.locator("[data-test='lastName']");
    this.inputPostalCode = page.locator("[data-test='postalCode']");
    this.buttonContinue = page.locator("[data-test='continue']");
  }
}
