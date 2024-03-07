import { Service } from 'typedi';
import L from './i18n-node';
import { Locales } from './i18n-types';

@Service()
export class LocaleService {
   private locale: Locales;

   constructor(locale: Locales = 'en') {
      this.locale = locale;
   }

   getLocale() {
      return this.locale;
   }

   setLocale(locale: Locales) {
      console.log('setLocale', locale);
      this.locale = locale;
   }

   i18n() {
      console.log(this.locale);
      return L[this.locale];
   }
}
