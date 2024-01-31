import { Page, Locator } from "@playwright/test";
import BasePage from "page/basePage";

import { Product } from "models/data.interfaces";

export default class CartPage extends BasePage {
  readonly pageTitle: Locator;
  readonly itemCartList: Locator;
  readonly itemNameList: Locator;
  readonly itemPriceList: Locator;
  readonly buttonCheckout: Locator;
  readonly removeButton: Locator;

  public cartItemsAdded: string;
  public elementName: string;

  constructor(page: Page) {
    super(page);

    this.pageTitle = page.locator(".title");
    this.itemCartList = page.locator(".cart_item");
    this.itemNameList = page.locator(".inventory_item_name");
    this.itemPriceList = page.locator(".inventory_item_price");
    this.buttonCheckout = page.locator("[data-test='checkout']");
    this.removeButton = page.locator(".item_pricebar button");

    this.cartItemsAdded;
  }

  public async clickCheckoutButton(): Promise<void> {
    await this.buttonCheckout.click();
  }

  public async clickRemoveButton(): Promise<Locator> {
    this.elementName = String(await this.removeButton.first().getAttribute("data-test"))
      .slice(7)
      .replace("-", " ");
    await this.removeButton.first().click();

    return this.itemNameList.getByText(this.elementName);
  }

  public async getCartProducts(): Promise<Product[]> {
    const count = await this.itemNameList.count();
    const products: Product[] = [];
    for (let i = 0; i < count; i++) {
      products.push({
        itemName: await this.itemNameList.nth(i).textContent(),
        price: Number(await this.itemPriceList.nth(i).textContent()),
      });
    }
    return products;
  }

  async removeAllProducts(): Promise<Locator> {
    const count = await this.itemNameList.count();
    for (let i = count; i > 0; i--) {
      await this.removeButton.first().click();
    }

    return this.itemNameList;
  }
}
