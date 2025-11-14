// tests/learning/data-generation/
// faker.spec.ts
// import { faker } from "@faker-js/faker"; // ? EN verze fakeru
import { fakerCS_CZ as faker } from "@faker-js/faker"; // ? Česká lokalizace fakeru - nemusí generovat vše v češtině (pokud není podporováno, vygeneruje v AJ)
import { test } from "@playwright/test";

test("Testing Data Generation with Faker", async ({ page }) => {
  const firstName = faker.person.firstName("female");
  const lastName = faker.person.lastName("female");
  const email = faker.internet.email({
    firstName: firstName,
    lastName: lastName,
    provider: "seznam.cz",
  });
  const address = faker.location.streetAddress();
  const password = faker.internet.password();

  console.log("Generated User Data:");
  console.log(`First Name: ${firstName}`);
  console.log(`Last Name: ${lastName}`);
  console.log(`Email: ${email}`);
  console.log(`Address: ${address}`);
  console.log(`Password: ${password}`);
});
