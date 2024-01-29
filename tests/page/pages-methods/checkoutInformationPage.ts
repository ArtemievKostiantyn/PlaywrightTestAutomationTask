import { expect, Page } from "@playwright/test";
import CheckoutInformationLocators from "../pages-locators/checkoutInformationLocators";

export default class CheckoutInformationPage {
  private readonly checkoutInformationLocators: CheckoutInformationLocators;

  constructor(page: Page) {
    this.checkoutInformationLocators = new CheckoutInformationLocators(page);
  }

  public async enterFirstName({ firstName }) {
    await this.checkoutInformationLocators.inputFirstName.scrollIntoViewIfNeeded();
    await this.checkoutInformationLocators.inputFirstName.fill(firstName);
  }

  public async enterLastName({ lastName }) {
    await this.checkoutInformationLocators.inputLastName.scrollIntoViewIfNeeded();
    await this.checkoutInformationLocators.inputLastName.fill(lastName);
  }

  public async enterPostalCode({ postalCode }) {
    await this.checkoutInformationLocators.inputPostalCode.scrollIntoViewIfNeeded();
    await this.checkoutInformationLocators.inputPostalCode.fill(postalCode);
  }

  public async verifyLastName({ lastName }) {
    await expect(this.checkoutInformationLocators.inputLastName).toHaveValue(lastName);
  }

  public async verifyFirstName({ firstName }) {
    await expect(this.checkoutInformationLocators.inputFirstName).toHaveValue(firstName);
  }

  public async verifyPostalCode({ postalCode }) {
    await expect(this.checkoutInformationLocators.inputPostalCode).toHaveValue(postalCode);
  }

  public async clickButtonContinue() {
    await this.checkoutInformationLocators.buttonContinue.click();
  }
}
