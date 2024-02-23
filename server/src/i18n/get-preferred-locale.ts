import { Request } from 'express';
import { Locales } from './i18n-types';
import {
   initAcceptLanguageHeaderDetector,
   initRequestParametersDetector,
   initRequestCookiesDetector,
   initQueryStringDetector,
} from 'typesafe-i18n/detectors';
import { detectLocale } from './i18n-util';

export const getPreferredLocale = (req: Request): Locales => {
   const headers = {
      get: (key: string) => (req.headers[key] as string) || null,
   };
   const acceptLanguageDetector = initAcceptLanguageHeaderDetector(
      { headers },
      'lang'
   );
   const requestCookiesDetector = initRequestCookiesDetector(req, 'lang');

   return detectLocale(acceptLanguageDetector, requestCookiesDetector);
};
