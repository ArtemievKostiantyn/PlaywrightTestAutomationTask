import { Locator, Page } from "@playwright/test";

export default class ProductLocators {
  protected readonly page: Page;
  readonly pageTitle: Locator;
  readonly dropdownProductSort: Locator;
  readonly itemList: Locator;
  readonly itemNameList: Locator;
  readonly itemPriceList: Locator;
  readonly itemBtnList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator(".title");
    this.dropdownProductSort = page.locator("[data-test='product_sort_container']");
    this.itemList = page.locator(".inventory_item");
    this.itemNameList = page.locator(".inventory_item_name");
    this.itemPriceList = page.locator(".inventory_item_price");
    this.itemBtnList = page.locator("button.btn_inventory");
  }
}
