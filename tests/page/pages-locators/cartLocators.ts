import { Locator, Page } from "@playwright/test";

export default class CartLocators {
  protected readonly page: Page;
  readonly pageTitle: Locator;
  readonly itemCartList: Locator;
  readonly itemNameList: Locator;
  readonly itemPriceList: Locator;
  readonly buttonCheckout: Locator;
  readonly removeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator(".title");
    this.itemCartList = page.locator(".cart_item");
    this.itemNameList = page.locator(".inventory_item_name");
    this.itemPriceList = page.locator(".inventory_item_price");
    this.buttonCheckout = page.locator("[data-test='checkout']");
    this.removeButton = page.locator(".item_pricebar button");
  }
}
