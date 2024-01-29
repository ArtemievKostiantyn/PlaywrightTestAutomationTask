import { test } from "../page/test_extender";
import data from "../data/test-data.json";

test("Check sorting", async ({ loginPage, productsPage }) => {
  await loginPage.goto();
  await loginPage.login(data.loginPage);
  let expectedProducts = await productsPage.expectedSortProductAZ();
  await productsPage.sortProductsByVisibleText(data.sortProductsAZ);
  let actualProducts = await productsPage.getProducts();
  await productsPage.verifyProductsOrdered(actualProducts, expectedProducts);

  expectedProducts = await productsPage.expectedSortProductZA();
  await productsPage.sortProductsByVisibleText(data.sortProductsZA);
  actualProducts = await productsPage.getProducts();
  await productsPage.verifyProductsOrdered(actualProducts, expectedProducts);

  let expectedPrices = await productsPage.expectedSortPriceLowToHigh();
  await productsPage.sortProductsByVisibleText(data.sortPricesLowToHigh);
  let actualPrices = await productsPage.getPrices();
  await productsPage.verifyPricesOrdered(actualPrices, expectedPrices);

  expectedPrices = await productsPage.expectedSortPriceHighToLow();
  await productsPage.sortProductsByVisibleText(data.sortPricesHighToLow);
  actualPrices = await productsPage.getPrices();
  await productsPage.verifyPricesOrdered(actualPrices, expectedPrices);
});
