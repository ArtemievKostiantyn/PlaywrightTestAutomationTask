import { Locator, Page } from "@playwright/test";

export default class LoginLocators {
  protected readonly page: Page;
  readonly loginContainer: Locator;
  readonly inputUser: Locator;
  readonly inputPassword: Locator;
  readonly buttonSubmit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginContainer = page.locator("#root");
    this.inputUser = page.locator("#user-name[type=text]");
    this.inputPassword = page.locator("#password[type=password]");
    this.buttonSubmit = page.locator("#login-button[type=submit]");
  }
}
