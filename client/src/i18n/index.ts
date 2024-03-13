import { ELang } from '@/types/share'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import resources from './resources'

export const lngs: Record<ELang, string> = {
  [ELang.EN]: 'English',
  [ELang.VI]: 'Tiếng Việt',
}

i18n

  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: import.meta.env.NODE_ENV === 'development',
    fallbackLng: ELang.EN,
    detection: {
      order: ['queryString', 'cookie', 'localstorage'],
      lookupLocalStorage: 'lang',
      lookupCookie: 'lang',
      lookupQuerystring: 'lang',
      caches: ['localStorage', 'cookie'],
    },
    ns: ['common', 'forms', 'register', 'login', 'layout'],
    resources,
  })
export default i18n
