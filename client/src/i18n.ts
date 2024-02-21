import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
   .use(Backend)
   .use(LanguageDetector)
   .use(initReactI18next)
   .init({
      debug: process.env.NODE_ENV === 'development',
      fallbackLng: 'vi',
      detection: {
         order: ['queryString', 'cookie', 'localstorage'],
         lookupLocalStorage: 'lang',
         lookupCookie: 'lang',
         lookupQuerystring: 'lang',
         caches: ['localStorage', 'cookie'],
      },
      interpolation: {
         escapeValue: false,
      },
   });
export default i18n;
