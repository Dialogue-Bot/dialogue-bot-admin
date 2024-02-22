import 'i18next';

declare module 'i18next' {
   interface CustomTypeOptions {
      resources: {
         login: typeof import('../public/locales/en/login.json');
         common: typeof import('../public/locales/en/common.json');
         layout: typeof import('../public/locales/en/layout.json');
         forms: typeof import('../public/locales/en/forms.json');
         register: typeof import('../public/locales/en/register.json');
         forgot_pass: typeof import('../public/locales/en/forgot_pass.json');
         set_pass: typeof import('../public/locales/en/set_pass.json');
      };
   }
}
