import { test, expect } from "page/test_extender";
import data from "data/test-data.json";

test.beforeEach(async ({ loginPage }) => await loginPage.login(data.loginPage));

test("Check products adding to the cart", async ({ productsPage, cartPage }) => {
  const productsAddedToCart = await productsPage.addProducts();
  await productsPage
    .clickShoppingCartButton()
    .then(async () => expect(await cartPage.getCartProducts()).toStrictEqual(productsAddedToCart));
});

test("Check products removing from the cart", async ({ productsPage, cartPage }) => {
  const productsAddedToCart = await productsPage.addProducts();
  await productsPage
    .clickShoppingCartButton()
    .then(async () => expect(await cartPage.getCartProducts()).toStrictEqual(productsAddedToCart));

  await cartPage.clickRemoveButton().then(async (removedItem) => await expect(removedItem).toBeHidden());
  await cartPage.removeAllProducts().then(async (removedItemsList) => await expect(removedItemsList).toBeHidden());
});

test("Submit an order", async ({
  productsPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage,
  checkoutCompletePage,
}) => {
  const productsAddedToCart = await productsPage.addProducts();
  await productsPage.clickShoppingCartButton();
  await cartPage
    .clickShoppingCartButton()
    .then(async () => expect(await cartPage.getCartProducts()).toStrictEqual(productsAddedToCart));
  await cartPage.clickCheckoutButton();

  await checkoutInformationPage.fillOrderForm({ consumer: data.checkoutInformationPage });
  await checkoutInformationPage.getOrderFormData().then(({ firstName, lastName, postalCode }) => {
    // Made assertions 'soft' so we can check all 3 fields before failing the test or going forward
    expect.soft(firstName).toEqual(data.checkoutInformationPage.firstName);
    expect.soft(lastName).toEqual(data.checkoutInformationPage.lastName);
    expect.soft(postalCode).toEqual(data.checkoutInformationPage.postalCode);

    // Avoid running further if there were soft assertion failures.
    expect(test.info().errors).toHaveLength(0);
  });
  await checkoutInformationPage.clickButtonContinue();
  await checkoutOverviewPage.clickButtonFinish();
  await checkoutCompletePage
    .getPagetitle()
    .then(async (pageTitle) => await expect(pageTitle).toContainText(data.checkoutCompletePage.titlePage));
});
