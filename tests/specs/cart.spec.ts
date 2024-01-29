import { test } from "../page/test_extender";
import data from "../data/test-data.json";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(data.loginPage);
});

test("Check products adding to the cart", async ({ productsPage, cartPage }) => {
  await productsPage.addProducts();
  const productsAddedToCart = await productsPage.getItemsAdded();
  await productsPage.getHeaderComponent.clickShoppingCartButton();
  await cartPage.verifyProductsAdded(productsAddedToCart);
});

test("Check products removing from the cart", async ({ productsPage, cartPage }) => {
  await productsPage.addProducts();
  const productsAddedToCart = await productsPage.getItemsAdded();
  await productsPage.getHeaderComponent.clickShoppingCartButton();
  await cartPage.verifyProductsAdded(productsAddedToCart);

  await cartPage.clickRemoveButton();
  await cartPage.verifyProductIsRemoved();
  await cartPage.removeAllProducts();
  await cartPage.verifyCartIsEmpty();
});

test("Submit an order", async ({
  productsPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage,
  checkoutCompletePage,
}) => {
  await productsPage.addProducts();
  const productsAddedToCart = await productsPage.getItemsAdded();
  await productsPage.getHeaderComponent.clickShoppingCartButton();
  await cartPage.verifyProductsAdded(productsAddedToCart);
  await cartPage.clickCheckoutButton();
  await checkoutInformationPage.enterFirstName(data.checkoutInformationPage);
  await checkoutInformationPage.verifyFirstName(data.checkoutInformationPage);
  await checkoutInformationPage.enterLastName(data.checkoutInformationPage);
  await checkoutInformationPage.verifyLastName(data.checkoutInformationPage);
  await checkoutInformationPage.enterPostalCode(data.checkoutInformationPage);
  await checkoutInformationPage.verifyPostalCode(data.checkoutInformationPage);
  await checkoutInformationPage.clickButtonContinue();
  await checkoutOverviewPage.clickButtonFinish();
  await checkoutCompletePage.verifyCurrentPage(data.checkoutCompletePage);
});
