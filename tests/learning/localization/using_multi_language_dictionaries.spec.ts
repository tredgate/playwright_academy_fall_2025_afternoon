// tests/learning/localization/
// using_multi_language_dictionaries.spec.ts

import { Page, test, expect } from "@playwright/test";
import {
  getCurrentLanguage,
  translations,
} from "../../../src/locales/translations.ts";

test("Multi Language Test: " + getCurrentLanguage(), async ({ page }) => {
  await page.goto("https://tegb-frontend-88542200c6db.herokuapp.com/");

  // * Přepnutí jazyka dle aktuálního jazyka
  await clickLanguageButton(page);
  await expect(
    page.locator('[data-testid="username-input"]'),
    "Username have Placeholder"
  ).toHaveAttribute("placeholder", translations.usernamePlaceholder);
  await expect(
    page.locator('[data-testid="password-input"]'),
    "Password have Placeholder"
  ).toHaveAttribute("placeholder", translations.passwordPlaceholder);
  await expect(
    page.locator('[data-testid="registration-link"]'),
    "Lost Password Link have Text"
  ).toHaveText(translations.lostPassword);
  await expect(
    page.locator('[data-testid="register-button"]'),
    "Register Button have Text"
  ).toHaveText(translations.register);
  await expect(
    page.locator('[data-testid="submit-button"]'),
    "Login Button have Text"
  ).toHaveText(translations.login);
});

async function clickLanguageButton(page: Page) {
  switch (getCurrentLanguage()) {
    case "cs":
      await page.locator('[data-testid="cz"]').click();
      break;
    case "en":
      await page.locator('[data-testid="en"]').click();
      break;
    default:
      throw new Error("Unsupported language");
  }
}
