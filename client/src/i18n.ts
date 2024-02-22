import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-chained-backend';
import HttpApi from 'i18next-http-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';
import { initReactI18next } from 'react-i18next';
import { ELang } from './types/share';

export const lngs: Array<{
   code: ELang;
   name: string;
}> = [
   {
      code: ELang.EN,
      name: 'English',
   },
   {
      code: ELang.VI,
      name: 'Tiếng Việt',
   },
];

i18n
   .use(Backend)
   .use(LanguageDetector)
   .use(initReactI18next)
   .init({
      debug: process.env.NODE_ENV === 'development',
      fallbackLng: ELang.EN,
      detection: {
         order: ['queryString', 'cookie', 'localstorage'],
         lookupLocalStorage: 'lang',
         lookupCookie: 'lang',
         lookupQuerystring: 'lang',
         caches: ['localStorage', 'cookie'],
      },
      ns: ['common', 'forms', 'register', 'login', 'layout'],
      backend: {
         backends: [
            LocalStorageBackend, // primary backend
            HttpApi, // fallback backend
         ],
         backendOptions: [
            {
               loadPath: '/locales/{{lng}}/{{ns}}.json',
            },
         ],
      },
   });
export default i18n;
