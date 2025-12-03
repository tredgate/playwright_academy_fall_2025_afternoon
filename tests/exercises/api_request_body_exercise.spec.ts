import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Exercise: POST Request with Body", async ({ request }) => {
  const username =
    faker.internet.username() + "_" + faker.number.int({ max: 1_000_000 });
  const email = faker.internet.exampleEmail();

  await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/register",
    {
      data: {
        username,
        password: "123456",
        email,
      },
    }
  );
});
