import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";

export type Environment = "DEV" | "TEST" | "PROD";

export type User = {
  firstName: string;
  lastName: string;
  username: string;
  age: number;
  email: string;
  address: Address;
};

export type Address = {
  street: string;
  houseNumber: string;
  city: string;
  country: "Czechia" | "Germany" | "France";
};

test("Using Types and Data in Object Literal", async () => {
  const randomUser: User = {
    firstName: faker.person.firstName("female"),
    lastName: faker.person.lastName("female"),
    username: faker.internet.username(),
    age: faker.number.int({ min: 15, max: 110 }),
    email: faker.internet.email(),
    address: {
      street: "Nová",
      houseNumber: "54",
      city: "Praha",
      country: "Czechia",
    },
  };
  logData(randomUser, "TEST");
});

function logData(user: User, environment: Environment) {
  console.log(`Jméno a příjmení: ${user.firstName} ${user.lastName}`);
  console.log("Email: " + user.email);
  console.log("Věk: " + user.age);
  console.log("Prostředí: " + environment);
}
