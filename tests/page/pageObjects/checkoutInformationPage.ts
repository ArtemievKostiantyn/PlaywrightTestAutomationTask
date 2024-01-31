import { Page, Locator } from "@playwright/test";
import { ConsumerDetails } from "models/data.interfaces";
import BasePage from "page/basePage";

export default class CheckoutInformationPage extends BasePage {
  readonly pageTitle: Locator;
  readonly checkoutInformationContainer: Locator;
  readonly inputFirstName: Locator;
  readonly inputLastName: Locator;
  readonly inputPostalCode: Locator;
  readonly buttonContinue: Locator;

  constructor(page: Page) {
    super(page);

    this.pageTitle = page.locator(".title");
    this.checkoutInformationContainer = page.locator("#checkout_info_container");
    this.inputFirstName = page.locator("[data-test='firstName']");
    this.inputLastName = page.locator("[data-test='lastName']");
    this.inputPostalCode = page.locator("[data-test='postalCode']");
    this.buttonContinue = page.locator("[data-test='continue']");
  }

  public async fillOrderForm({ consumer, finish }: { consumer: ConsumerDetails; finish?: boolean }): Promise<void> {
    await this.inputFirstName.scrollIntoViewIfNeeded();
    await this.inputFirstName.fill(consumer.firstName);
    await this.inputLastName.fill(consumer.lastName);
    await this.inputPostalCode.fill(consumer.postalCode);

    // finishing the form is required for test when filling order form is needed to continue the flow and we don't check the form itself
    if (finish) await this.clickButtonContinue();
  }

  public async getOrderFormData(): Promise<ConsumerDetails> {
    return {
      firstName: await this.inputFirstName.inputValue(),
      lastName: await this.inputLastName.inputValue(),
      postalCode: await this.inputPostalCode.inputValue(),
    };
  }

  public async clickButtonContinue(): Promise<void> {
    await this.buttonContinue.click();
  }
}
