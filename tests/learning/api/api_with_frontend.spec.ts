// tests/learning/api/
// api_with_frontend.spec.ts
import { expect, test } from "@playwright/test";

test.describe("Frontend with API Tests", () => {
  test("Login API Check", async ({ page }) => {
    await page.goto("http://localhost:3001/");
    await page.locator('[data-testid="username"]').fill("fifka_petr");
    await page.locator('[data-testid="password"]').fill("Tredgate2023#");

    // ? Zapínáme Listener waitForResponse, který odchytává HTTP requesty pomocí adresy/regulárního výrazu pro část URL (například path)
    const loginPromise = page.waitForResponse(/auth\/login/);
    await page.locator('[data-testid="log_in"]').click();
    await loginPromise; // ? Počká, než se dokončí login API
    await page.locator('[data-testid="logout_button"]').click();
  });

  test("Intercepted API Login Test (SIT)", async ({ page }) => {
    const username = "fifka_petr";
    const password = "Tredgate2023#";

    await page.goto("http://localhost:3001/");
    await page.locator('[data-testid="username"]').fill(username);
    await page.locator('[data-testid="password"]').fill(password);

    // ? Zapínáme Listener waitForResponse, který odchytává HTTP requesty pomocí adresy/regulárního výrazu pro část URL (například path)
    const loginPromise = page.waitForResponse(/auth\/login/);
    await page.locator('[data-testid="log_in"]').click();
    const loginApiResult = await loginPromise; // ? Počká, než se dokončí login API
    //  await page.locator('[data-testid="logout_button"]').click();

    // * Testy na odchycenou api
    const loginRequest = loginApiResult.request();

    // * Login request (požadavek) část testů
    const requestUrl = loginRequest.url();
    expect(requestUrl, "Login Request URL should be correct").toContain(
      "/auth/login"
    );
    const requestMethod = loginRequest.method();
    expect(requestMethod, "Login Request should have POST method").toEqual(
      "POST"
    );
    const requestBody = loginRequest.postDataJSON();
    expect(
      requestBody.username,
      "Login Request body.username should have text"
    ).toBe(username);
    expect(
      requestBody.password,
      "Login Request body.password should have text"
    ).toBe(password);

    // * Login Response (odpověď) část textů
    const responseStatus = loginApiResult.status();
    expect(responseStatus, "Login Response Status is 201").toBe(201);
    const responseBody = await loginApiResult.json();
    expect(
      responseBody,
      "Login Response body have property: access_token"
    ).toHaveProperty("access_token");
  });
});
