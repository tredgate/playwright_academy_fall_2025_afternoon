import { test, expect } from "@playwright/test";

test("Exercise: Response Body Asserts", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/4"
  );

  const responseBody = await response.json();

  expect(
    responseBody,
    "User Response Body Should has property: userId"
  ).toHaveProperty("userId");
  expect(
    typeof responseBody.active,
    "responseBody.active should be a number"
  ).toEqual("number");
  expect(
    responseBody.username,
    "responseBody.username has Correct Value"
  ).toEqual("petrfifka");
});
