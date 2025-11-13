// src/ai/
// generators.ts
function generatePassword(length: number): string {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

/**
 * Generates a random username combining an adjective, noun, and number.
 *
 * @param name - The input name parameter (currently unused in the implementation)
 * @returns A string in the format of `{Adjective}{Noun}{Number}`, where:
 *          - Adjective is randomly selected from a predefined list
 *          - Noun is randomly selected from a predefined list
 *          - Number is a random integer between 0 and 999
 *
 * @example
 * ```typescript
 * const username1 = generateUsername("John");
 * // Returns something like: "SwiftLion342"
 * ```
 *
 * @example
 * ```typescript
 * const username2 = generateUsername("Jane");
 * // Returns something like: "BraveEagle789"
 * ```
 *
 * @example
 * ```typescript
 * const username3 = generateUsername("Bob");
 * // Returns something like: "MightyWolf156"
 * ```
 */
function generateUsername(name: string): string {
  const adjectives = [
    "Swift",
    "Clever",
    "Brave",
    "Wise",
    "Mighty",
    "Fierce",
    "Nimble",
  ];
  const nouns = ["Lion", "Eagle", "Shark", "Wolf", "Tiger", "Panther"];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 1000);
  return `${adj}${noun}${number}`;
}

const password = generatePassword(12);
console.log(`Generated Password: ${password}`);
const username = generateUsername("JohnDoe");
console.log(`Generated Username: ${username}`);

/**
 * Generates a random Czech first name.
 *
 * @param sex - Optional parameter to specify the sex of the name ("male" or "female").
 * @returns A randomly selected Czech first name based on the specified sex.
 *
 * @example
 * ```typescript
 * const maleName = generateFirstName("male");
 * // Returns something like: "Jan"
 *
 * const femaleName = generateFirstName("female");
 * // Returns something like: "Eva"
 *
 * const randomName = generateFirstName();
 * // Returns something like: "Petr" or "Anna"
 * ```
 */
function generateFirstName(sex?: "male" | "female"): string {
  const maleNames = [
    "Jan",
    "Petr",
    "Josef",
    "Martin",
    "Jakub",
    "Tomáš",
    "Lukáš",
    "David",
    "Michal",
    "Pavel",
    "Jiří",
    "Václav",
    "Adam",
    "Ondřej",
    "Filip",
    "Daniel",
    "Matěj",
    "Vojtěch",
    "Radek",
    "Stanislav",
  ];
  const femaleNames = [
    "Anna",
    "Eva",
    "Marie",
    "Jana",
    "Lucie",
    "Tereza",
    "Kateřina",
    "Petra",
    "Veronika",
    "Barbora",
    "Zuzana",
    "Michaela",
    "Lenka",
    "Klára",
    "Kristýna",
    "Nikola",
    "Markéta",
    "Adéla",
    "Denisa",
    "Natálie",
  ];
  if (sex === "male") {
    return maleNames[Math.floor(Math.random() * maleNames.length)];
  } else if (sex === "female") {
    return femaleNames[Math.floor(Math.random() * femaleNames.length)];
  } else {
    const allNames = [...maleNames, ...femaleNames];
    return allNames[Math.floor(Math.random() * allNames.length)];
  }
}

const firstName = generateFirstName();
console.log(`Generated First Name: ${firstName}`);
