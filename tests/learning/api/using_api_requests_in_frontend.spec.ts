// tests/learning/api/
// using_api_requests_in_frontend.spec.ts

import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Register and Login via API to app", async ({ page, request }) => {
  const username = faker.internet.username();
  const email = faker.internet.exampleEmail();
  const password = "Tredgate256#";

  // * Registrace pomocí API
  await request.post("http://localhost:3000/user/register", {
    data: {
      username,
      password,
      email,
    },
  });

  // * Login pomocí API
  const loginResponse = await request.post("http://localhost:3000/auth/login", {
    data: {
      username,
      password,
    },
  });

  // * Nastavení cookies
  const loginResponseBody = await loginResponse.json();
  const accessToken = loginResponseBody.access_token;

  await page.context().addCookies([
    {
      name: "access_token",
      value: accessToken,
      path: "/",
      domain: "localhost",
    },
  ]);

  // * Otevření Accounts (bez frontend přihlášení)
  await page.goto("http://localhost:3001/app");
  await page.locator('[data-testid="accounts_section_link"]').click();
  await expect(page.locator('[data-testid="loader"]')).toBeHidden();
  await expect(page.locator('[data-testid="title"]')).toHaveText("Account");
});
