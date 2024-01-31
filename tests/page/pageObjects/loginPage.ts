import { Page, Locator } from "@playwright/test";
import BasePage from "page/basePage";

export default class LoginPage extends BasePage {
  readonly loginContainer: Locator;
  readonly inputUser: Locator;
  readonly inputPassword: Locator;
  readonly buttonSubmit: Locator;

  constructor(page: Page) {
    super(page);

    this.loginContainer = page.locator("#root");
    this.inputUser = page.locator("#user-name[type=text]");
    this.inputPassword = page.locator("#password[type=password]");
    this.buttonSubmit = page.locator("#login-button[type=submit]");
  }

  public async enterUsername({ username }): Promise<void> {
    await this.inputUser.scrollIntoViewIfNeeded();
    await this.inputUser.fill(username);
  }

  public async enterPassword({ password }): Promise<void> {
    await this.inputPassword.scrollIntoViewIfNeeded();
    await this.inputPassword.fill(password);
  }

  public async clickButtonSubmit(): Promise<void> {
    await this.buttonSubmit.click();
  }

  public async login({ username, password }): Promise<void> {
    await this.page.goto("/");
    await this.enterUsername({ username });
    await this.enterPassword({ password });
    await this.clickButtonSubmit();
  }
}
