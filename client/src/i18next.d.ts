import 'i18next';

declare module 'i18next' {
   interface CustomTypeOptions {
      resources: typeof import('../public/locales/en/translation.json');
   }
}
