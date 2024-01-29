import { Page, expect } from "@playwright/test";
import SupportMethods from "../../utils/supportMethods";
import HeaderPage from "./headerPage";
import ProductLocators from "../pages-locators/productLocators";

export default class ProductsPage {
  private readonly productLocators: ProductLocators;
  private readonly supportMethods: SupportMethods;
  private readonly headerPage: HeaderPage;
  private indexProductsToAdd: number[];
  private itemsAdded: string;

  constructor(page: Page) {
    this.productLocators = new ProductLocators(page);
    this.supportMethods = new SupportMethods(page);
    this.headerPage = new HeaderPage(page);
  }

  public get getHeaderComponent(): HeaderPage {
    return this.headerPage;
  }

  public async getPrices() {
    return (await this.productLocators.itemPriceList.allTextContents()).map((price: string) => price.slice(1));
  }

  public async getProducts() {
    return await this.productLocators.itemNameList.allTextContents();
  }

  public async verifyCurrentPage({ titlePage: expectedTitlePage }) {
    await expect(this.productLocators.pageTitle).toContainText(expectedTitlePage);
  }

  public async sortProductsByVisibleText(sortProducts: string) {
    await this.productLocators.dropdownProductSort.selectOption(sortProducts);
  }

  public async expectedSortPriceLowToHigh() {
    return (await this.getPrices()).flat().sort((a, b) => +a - +b);
  }

  public async expectedSortPriceHighToLow() {
    return (await this.getPrices()).flat().sort((b, a) => +a - +b);
  }

  public async expectedSortProductAZ() {
    return (await this.getProducts()).flat().sort();
  }

  public async expectedSortProductZA() {
    return (await this.getProducts()).flat().sort().reverse();
  }

  public verifyPricesOrdered(actualPrices: Promise<string>[], expectedPrices: Promise<string>[]) {
    expect(JSON.stringify(actualPrices, null, 2)).toEqual(JSON.stringify(expectedPrices, null, 2));
  }

  public verifyProductsOrdered(actualProducts: string[], expectedProducts: string[]) {
    expect(JSON.stringify(actualProducts, null, 2)).toEqual(JSON.stringify(expectedProducts, null, 2));
  }

  public async productsRandomToAdd() {
    const productListLength = await this.productLocators.itemList.count();
    const newIndexProductList = new Set<number>();
    for (let index = 0; index < productListLength; index++) {
      newIndexProductList.add(this.supportMethods.getRandomPositiveNumber(productListLength));
    }
    this.indexProductsToAdd = [...newIndexProductList];
  }

  public async addProducts() {
    await this.productsRandomToAdd();
    const products: { itemName: string | null; price: string | null }[] = [];
    for (const index of this.indexProductsToAdd) {
      products.push({
        itemName: await this.productLocators.itemNameList.nth(index).textContent(),
        price: await this.productLocators.itemPriceList.nth(index).textContent(),
      });
      await this.productLocators.itemBtnList.nth(index).click();
    }
    this.itemsAdded = this.supportMethods.jsonToString(products);
  }

  public async getItemsAdded() {
    return this.itemsAdded;
  }
}
