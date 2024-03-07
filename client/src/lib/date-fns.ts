import * as dateFnsLocales from 'date-fns/locale';
import { Locale } from 'date-fns';
import i18n from '@/i18n';

interface Locales {
   [key: string]: Locale;
}

export const getDateFnsLocale = (): Locale => {
   const locales: Locales = {
      en: dateFnsLocales.enUS,
      vi: dateFnsLocales.vi,
   };

   return locales[i18n.language];
};
