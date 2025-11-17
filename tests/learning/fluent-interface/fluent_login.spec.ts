// tests/learning/fluent-interface/
// fluent_login.spec.ts

import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test("Login Test Using Fluent Interface", async ({ page }) => {
  const loginPage = new LoginPage(page); // ? Constructor je vždy synchronní! Nelze vytvářet v rámci fluent bez const

  await loginPage
    .open()
    .then((login) => login.fillUsername("pw_academy"))
    .then((login) => login.fillPassword("Playwright321!"))
    .then((login) => login.clickLogin())
    .then((dashboard) => dashboard.clickProfile())
    .then((dashboard) => dashboard.clickLogout());
});
/*
Cvičení - vytvoření testu na ztrátu hesla pomocí Fluent API (⌛10:00)
Vytvořte nový test na ztrátu hesla (tests/exercises/fluent_lost_password_tests.spec.ts)
Zmigrujte Page Object pro stránku ztráta hesla (lost_password_page.ts)  do fluent interface ve složce: src/pages/pmtool
Vytvořte novou akci v Lost Password Page třídě:
Kliknutí na tlačítko zpět: clickBack(), 
lokátor: #back-btn
Přidejte return hodnoty do všech metod.
Vytvořte testy:
Ztracené heslo end to end (username: lost_password_user, email: lost_password@tredgate.cz)
Otevření stránky ztraceného hesla, návrat na login.

 Názvy testů vymyslete sami

 
Výzva
Vytvořte nový test v Automation Test Store: change_profile_tests.spec.ts, ve složce: tests/challenges
Založte si účet (manuálně) pomocí například mailu například z https://temp-mail.org/ 
Vytvořte test: Challenge Fluent: Change Telephone Test
Kroky v testu:
Přihlaste se
Otevřete: Edit account details
Změňte telefonní číslo
Odhlašte se
Využijte Page Objecty s Fluent API



*/
