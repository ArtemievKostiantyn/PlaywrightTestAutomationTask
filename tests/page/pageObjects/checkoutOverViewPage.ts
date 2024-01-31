import { Page, Locator } from "@playwright/test";
import BasePage from "page/basePage";

export default class CheckoutOverviewPage extends BasePage {
  readonly buttonFinish: Locator;

  constructor(page: Page) {
    super(page);

    this.buttonFinish = page.locator("[data-test='finish']");
  }

  public async clickButtonFinish(): Promise<void> {
    await this.buttonFinish.click();
  }
}
