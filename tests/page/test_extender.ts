import { test as base, expect as baseExpect } from "@playwright/test";
import LoginPage from "page/pageObjects/loginPage";
import ProductsPage from "page/pageObjects/productsPage";
import CartPage from "page/pageObjects/cartPage";
import CheckoutCompletePage from "page/pageObjects/checkoutCompletePage";
import CheckoutInformationPage from "page/pageObjects/checkoutInformationPage";
import CheckoutOverviewPage from "page/pageObjects/checkoutOverViewPage";

import chai from "chai";
// Due to how chai-sorted has to be used
// eslint-disable-next-line
chai.use(require("chai-sorted"));

interface MyPages {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutInformationPage: CheckoutInformationPage;
  checkoutCompletePage: CheckoutCompletePage;
  checkoutOverviewPage: CheckoutOverviewPage;
}

export const test = base.extend<MyPages>({
  loginPage: async ({ page }, use) => await use(new LoginPage(page)),
  productsPage: async ({ page }, use) => await use(new ProductsPage(page)),
  checkoutOverviewPage: async ({ page }, use) => await use(new CheckoutOverviewPage(page)),
  cartPage: async ({ page }, use) => await use(new CartPage(page)),
  checkoutCompletePage: async ({ page }, use) => await use(new CheckoutCompletePage(page)),
  checkoutInformationPage: async ({ page }, use) => await use(new CheckoutInformationPage(page)),
});

export const expect = baseExpect.extend({
  async toBeSortedBy(received, key: string, options?: { descending: boolean }) {
    const assertionName = "toBeSortedBy";

    try {
      chai.expect(received).to.be.sortedBy(key, options);
      return { name: assertionName, pass: true, message: () => "passed" };
    } catch (error) {
      console.log(JSON.stringify(error));
      return {
        name: "toBeSortedBy",
        pass: false,
        message: () =>
          this.utils.matcherHint(
            assertionName,
            received,
            `key: ${key}, order: ${options?.descending ? "descending" : "ascending"}`,
            { isNot: this.isNot }
          ) +
          "\n\n" +
          `${this.utils.printExpected(error.message)}\n` +
          `But the list is: ${this.utils.printReceived(error.actual)}`,
        expected: error.expected,
        actual: error.actual,
      };
    }
  },
});
