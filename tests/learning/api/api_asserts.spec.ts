// tests/learning/api/
// api_asserts.spec.ts

import { expect, test } from "@playwright/test";

test("Assert Response has 200 OK status", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/55"
  );
  expect(response.status(), "Eshop Response Status Should be 200").toBe(200);
});

test("Assert Response Header", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train"
  );
  const headers = response.headers();
  const contentType = headers["content-type"];
  console.log(JSON.stringify(headers, null, 2)); // ? Výpis hlaviček do konzole
  expect(contentType, "Header Content-Type has correct value").toBe(
    "application/json; charset=utf-8"
  );
});

test("Response Body Asserts", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train"
  );
  const responseBody = await response.json();
  // * Asserty existující property (například property message)
  expect(
    responseBody,
    "Property timestamp Should exist in Response Body"
  ).toHaveProperty("timestamp");
  expect(
    responseBody.timestamp,
    "Property timestamp Should exist in Response Body"
  ).toBeDefined(); // ? Alternativa k toHaveProperty - stejný výsledek

  // * Asserty datového typu (message je string)
  expect(typeof responseBody.id, "responseBody.id Should be a number").toEqual(
    "number"
  );
  expect(
    typeof responseBody.message,
    "responseBody.message Should be a string"
  ).toEqual("string");

  // * Asserty konkrétních dat (id == 1)
  expect(responseBody.id, "responseBody.id should have value 1").toEqual(1);
  expect(responseBody.message, "responseBody.message has correct text").toEqual(
    "TEG#B Training GET request successful"
  );
});
