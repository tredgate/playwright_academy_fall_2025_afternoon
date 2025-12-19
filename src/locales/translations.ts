// src/locales/cs.ts
// src/locales/en.ts
// translations.ts

import { csDictionary } from "./cs.ts";
import { enDictionary } from "./en.ts";

export type Dictionary = {
  usernamePlaceholder: string;
  passwordPlaceholder: string;
  lostPassword: string;
  register: string;
  login: string;
};

export function getCurrentLanguage() {
  const lang = process.env.TEST_LANGUAGE || "en";
  return lang;
}

export function getTranslations(): Dictionary {
  const lang = getCurrentLanguage();
  let dictionary: Dictionary;
  switch (lang) {
    case "cs":
      dictionary = csDictionary;
      break;
    case "en":
      dictionary = enDictionary;
      break;
    default:
      throw new Error(`Unsupported language: ${lang}`);
  }
  return dictionary;
}

export const translations = getTranslations();
