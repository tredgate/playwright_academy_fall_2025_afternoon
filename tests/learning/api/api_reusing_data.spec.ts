//tests/learning/api/
// api_reusing_data.spec.ts
import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Reusing Data Between API Calls", async ({ request }) => {
  const email = faker.internet.email({ provider: "tredgate.cz" });
  const password = "123456";
  const username =
    faker.internet.username() + "_" + faker.number.int({ max: 1_000_000 });
  let userId = 0;

  // * Registrační request - založení uživatele
  const registrationResponse = await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/register",
    {
      data: {
        username,
        email,
        password,
      },
    }
  );
  const registrationBody = await registrationResponse.json();
  userId = registrationBody.userId;

  const userResponse = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop",
    {
      params: {
        userId: userId,
      },
    }
  );
  const userBody = await userResponse.json();

  expect(userBody.username, "userBody.username has Correct Value").toEqual(
    username
  );
  expect(userBody.email, "userBody.email has Correct Value").toEqual(email);
});
