import { Page } from "@playwright/test";
import LoginLocators from "../pages-locators/loginLocators";

export default class LoginPage {
  private readonly loginLocators: LoginLocators;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.loginLocators = new LoginLocators(page);
  }

  public async goto() {
    await this.page.goto("/");
  }

  public async enterUsername({ username }) {
    await this.loginLocators.inputUser.scrollIntoViewIfNeeded();
    await this.loginLocators.inputUser.fill(username);
  }

  public async enterPassword({ password }) {
    await this.loginLocators.inputPassword.scrollIntoViewIfNeeded();
    await this.loginLocators.inputPassword.fill(password);
  }

  public async clickButtonSubmit() {
    await this.loginLocators.buttonSubmit.click();
  }

  public async login({ username, password }) {
    await this.enterUsername({ username });
    await this.enterPassword({ password });
    await this.clickButtonSubmit();
  }
}
