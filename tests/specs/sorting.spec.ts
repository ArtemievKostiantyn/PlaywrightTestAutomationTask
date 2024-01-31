import { test, expect } from "page/test_extender";
import data from "data/test-data.json";

test("Check sorting", async ({ loginPage, productsPage }) => {
  await loginPage.login(data.loginPage);

  await productsPage.sortProductsByVisibleText(data.sortProductsAZ);
  await productsPage.getProducts().then((productsList) => expect(productsList).toBeSortedBy("itemName"));

  await productsPage.sortProductsByVisibleText(data.sortProductsZA);
  await productsPage
    .getProducts()
    .then((productsList) => expect(productsList).toBeSortedBy("itemName", { descending: true }));

  await productsPage.sortProductsByVisibleText(data.sortPricesLowToHigh);
  await productsPage.getProducts().then((productsList) => expect(productsList).toBeSortedBy("price"));

  await productsPage.sortProductsByVisibleText(data.sortPricesHighToLow);
  await productsPage
    .getProducts()
    .then((productsList) => expect(productsList).toBeSortedBy("price", { descending: true }));
});
