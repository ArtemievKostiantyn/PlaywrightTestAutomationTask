import { expect, Page } from "@playwright/test";
import SupportMethods from "../../utils/supportMethods";
import CartLocators from "../pages-locators/cartLocators";

export default class CartPage {
  private readonly supportMethods: SupportMethods;
  private readonly cartLocators: CartLocators;
  public cartItemsAdded: string;
  public elementName: string;

  constructor(page: Page) {
    this.cartLocators = new CartLocators(page);
    this.supportMethods = new SupportMethods(page);
    this.cartItemsAdded;
  }

  public async clickCheckoutButton() {
    await this.cartLocators.buttonCheckout.click();
  }

  public async clickRemoveButton() {
    this.elementName = await String(this.cartLocators.removeButton.first().getAttribute("data-test"))
      .slice(7)
      .replace("-", " ");
    await this.cartLocators.removeButton.first().click();
  }

  public async getCartProducts() {
    const count = await this.cartLocators.itemNameList.count();
    const products: { itemName: string | null; price: string | null }[] = [];
    for (let i = 0; i < count; i++) {
      products.push({
        itemName: await this.cartLocators.itemNameList.nth(i).textContent(),
        price: await this.cartLocators.itemPriceList.nth(i).textContent(),
      });
    }
    return this.supportMethods.jsonToString(products);
  }

  async removeAllProducts() {
    const count = await this.cartLocators.itemNameList.count();
    for (let i = count; i > 0; i--) {
      await this.cartLocators.removeButton.first().click();
    }
  }

  async verifyProductsAdded(expectedProductsAdded: string) {
    expect(await this.getCartProducts()).toEqual(expectedProductsAdded);
  }

  async verifyProductIsRemoved() {
    await expect(this.cartLocators.itemNameList.getByText(this.elementName)).toBeHidden();
  }

  async verifyCartIsEmpty() {
    await expect(this.cartLocators.itemNameList).toBeHidden();
  }
}
