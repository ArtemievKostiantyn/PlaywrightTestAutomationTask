import { Page, Locator } from "@playwright/test";
import BasePage from "page/basePage";

import { Product } from "models/data.interfaces";

export default class ProductsPage extends BasePage {
  readonly pageTitle: Locator;
  readonly dropdownProductSort: Locator;
  readonly itemList: Locator;
  readonly itemNameList: Locator;
  readonly itemPriceList: Locator;
  readonly itemBtnList: Locator;

  private indexProductsToAdd: number[];
  private itemsAdded: Product[];

  constructor(page: Page) {
    super(page);

    this.pageTitle = page.locator(".title");
    this.dropdownProductSort = page.locator("[data-test='product_sort_container']");
    this.itemList = page.locator(".inventory_item");
    this.itemNameList = page.locator(".inventory_item_name");
    this.itemPriceList = page.locator(".inventory_item_price");
    this.itemBtnList = page.locator("button.btn_inventory");

    this.itemsAdded = [];
  }

  public async getProducts(): Promise<Product[]> {
    const itemList: Product[] = [];
    for (const item of await this.itemList.all()) {
      itemList.push({
        itemName: await item.locator(this.itemNameList).textContent(),
        price: Number((await item.locator(this.itemPriceList).textContent()).slice(1)),
      });
    }
    return itemList;
  }

  public async sortProductsByVisibleText(sortProducts: string): Promise<void> {
    await this.dropdownProductSort.selectOption(sortProducts);
  }

  public async selectRandomProducts(): Promise<void> {
    const productListLength = await this.itemList.count();
    const newIndexProductList = new Set<number>();
    for (let index = 0; index < productListLength; index++) {
      newIndexProductList.add(this.getRandomPositiveNumber(productListLength));
    }
    this.indexProductsToAdd = Array.from(newIndexProductList);
  }

  public async addProducts(): Promise<Product[]> {
    await this.selectRandomProducts();
    const products: Product[] = [];
    for (const index of this.indexProductsToAdd) {
      products.push({
        itemName: await this.itemNameList.nth(index).textContent(),
        price: Number(await this.itemPriceList.nth(index).textContent()),
      });
      await this.itemBtnList.nth(index).click();
    }
    this.itemsAdded.push(...products);
    return this.itemsAdded;
  }

  public getItemsAdded(): Product[] {
    return this.itemsAdded;
  }
}
