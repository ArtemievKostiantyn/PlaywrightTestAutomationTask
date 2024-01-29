import { test as base } from "@playwright/test";
import LoginPage from "./pages-methods/loginPage";
import ProductsPage from "./pages-methods/productsPage";
import CartPage from "./pages-methods/cartPage";
import CheckoutCompletePage from "./pages-methods/checkoutCompletePage";
import CheckoutInformationPage from "./pages-methods/checkoutInformationPage";
import CheckoutOverviewPage from "./pages-methods/checkoutOverViewPage";
import HeaderPage from "./pages-methods/headerPage";

interface MyPages {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  headerPage: HeaderPage;
  cartPage: CartPage;
  checkoutInformationPage: CheckoutInformationPage;
  checkoutCompletePage: CheckoutCompletePage;
  checkoutOverviewPage: CheckoutOverviewPage;
}

export const test = base.extend<MyPages>({
  loginPage: async ({ page }, use) => await use(new LoginPage(page)),
  productsPage: async ({ page }, use) => await use(new ProductsPage(page)),
  checkoutOverviewPage: async ({ page }, use) => await use(new CheckoutOverviewPage(page)),
  headerPage: async ({ page }, use) => await use(new HeaderPage(page)),
  cartPage: async ({ page }, use) => await use(new CartPage(page)),
  checkoutCompletePage: async ({ page }, use) => await use(new CheckoutCompletePage(page)),
  checkoutInformationPage: async ({ page }, use) => await use(new CheckoutInformationPage(page)),
});
export { expect } from "@playwright/test";
