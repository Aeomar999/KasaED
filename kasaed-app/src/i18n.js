import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Import the translation files
import enTranslation from "./locales/en/translation.json";
import twTranslation from "./locales/tw/translation.json";
import eeTranslation from "./locales/ee/translation.json";
import haTranslation from "./locales/ha/translation.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  tw: {
    translation: twTranslation,
  },
  ee: {
    translation: eeTranslation,
  },
  ha: {
    translation: haTranslation,
  },
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/src/locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      // order and from where user language should be detected
      order: ["localStorage", "navigator"],

      // keys or params to lookup language from
      lookupLocalStorage: "userLanguage",

      // cache user language on
      caches: ["localStorage"],

      // optional htmlTag with lang attribute, the default is:
      htmlTag: document.documentElement,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
