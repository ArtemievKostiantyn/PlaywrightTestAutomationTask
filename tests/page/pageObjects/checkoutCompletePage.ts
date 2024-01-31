import { Page, Locator } from "@playwright/test";
import BasePage from "page/basePage";

export default class CheckoutCompletePage extends BasePage {
  readonly completeHeader: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);

    this.pageTitle = page.locator(".title");
    this.completeHeader = page.locator(".complete-header");
  }

  public async getPagetitle(): Promise<Locator> {
    await this.pageTitle.waitFor({ state: "visible" });
    return this.pageTitle;
  }
}
