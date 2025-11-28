// tests/learning/forms/
// forms_actions.spec.ts
import { test } from "@playwright/test";
import path from "path";

test.describe("Forms Actions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/registration.html");
  });

  test("fill and pressSequantially", async ({ page }) => {
    const nameInput = page.locator("#name");
    await nameInput.fill("Start"); // * 1. vyplnění pole pomocí fill
    await nameInput.fill("End"); // * 2. Vyplnění pole - fill přepíše už stávající hodnotu
    await nameInput.pressSequentially("Kde toto bude?"); // * Vyplnění pomocí simulace klávesnice (jeden znak za druhým) -> nemaže stávající hodnoty v poli
    await nameInput.clear(); // ? Vyčistí hodnotu (value) v inputu, není potřeba používat s fill, který hodnotu maže automaticky, ale můžeme chtít pro pressSequantially
    await nameInput.pressSequentially("Pomalu píšu", { delay: 500 }); // ? Vypíše string, v tomto případě v rychlosti: 2 znaky za sekundu (500 ms čekání za každým znakem)
  });

  test("select option", async ({ page }) => {
    const genderSelect = page.locator("#gender");
    await genderSelect.selectOption("female"); // ? Výběr z prvku <select> pomocí atributu value v prvku <option>
    await genderSelect.selectOption({ label: "Male" }); // ? Výběr z <select> pomocí textu <option>
  });

  test("checkbox and radio check", async ({ page }) => {
    await page.locator("#contact-email").check(); // * Zakliknutí radio buttonu
    await page.locator("#interests-music").check();
    await page.locator("#interests-travel").check();
    await page.locator("#interests-travel").uncheck(); // * Odkliknutí prvku, funguje jen pro checkbox
  });

  test("Date fill", async ({ page }) => {
    // ? Pro vyplnění date polí používáme ISO 8601 formát: YYYY-MM-DD - 2025-01-31
    await page.locator("#date-of-birth").fill("1999-01-30"); // ! Pozor, toto funguje jen na prvek <input type="date">, často v aplikacích jsou datumy vytvořená jako zvláštní komponenta, pak uvidíme namísto inputu nejspíš sestavu <div>
  });

  test("Upload file", async ({ page }) => {
    const filePath = path.resolve(__dirname, "../../../assets/upload_file.txt");
    // require("../../../assets/upload_file.txt"); // ? require slouží pouze proto, aby nám pomohl připravit cestu (napovídá), path.resolve nenapovídá a je v něm složitější cestu vytvořit.
    // * Zapneme listenera (odchytávač) na událost vybrání souboru (filechooser) -> toto je asynchronní akce, NESMÍME před ni dát await (chceme aby listener poslouchal, ale nečekal)
    const fileChooserPromise = page.waitForEvent("filechooser"); // ? do const uložíme odkaz na listenara, abychom se po kliknutí na input type="file" mohli odkázat na výběr souboru
    // * Klikneme na tlačítko pro nahrání souboru (input type="file")
    await page.locator("#file-upload").click();
    // * Počkáme, než listener fileChooserPromise odchytí otevření okna pro výběr okna a uložíme výsledek (odchycené okno) do proměnné (abychom mohli následně vložit soubor)
    const fileChooser = await fileChooserPromise;
    // * Nahrajeme soubor pomocí proměnné filePath, kterou máme nachystanou z předchozích kroků
    await fileChooser.setFiles(filePath);
    // * Počkáme několik sekund, abychom v screenshotu viděli soubor vybraný
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(2000);
  });
});
