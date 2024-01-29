import { Page } from "@playwright/test";
import casual from "casual";

export default class SupportMethods {
  private readonly _page: Page;

  constructor(page: Page) {
    this._page = page;
  }

  getRandomPositiveNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }

  jsonToString(list): string {
    return JSON.stringify(list, null, 2);
  }

  getRandomFirstName(): string {
    return casual.first_name;
  }

  getRandomLastName(): string {
    return casual.last_name;
  }

  getRandomZip(): string {
    return casual.zip({ digits: 5 | 9 });
  }
}
