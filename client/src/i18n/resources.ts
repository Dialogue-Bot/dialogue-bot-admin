import commonEN from '@/locales/en/common.json';
import forgotPassEN from '@/locales/en/forgot_pass.json';
import formsEN from '@/locales/en/forms.json';
import layoutEN from '@/locales/en/layout.json';
import loginEN from '@/locales/en/login.json';
import mailEN from '@/locales/en/mail.json';
import profileEN from '@/locales/en/profile.json';
import registerEN from '@/locales/en/register.json';
import setPassEN from '@/locales/en/set_pass.json';
import commonVI from '@/locales/vi/common.json';
import forgotPassVI from '@/locales/vi/forgot_pass.json';
import formsVI from '@/locales/vi/forms.json';
import layoutVI from '@/locales/vi/layout.json';
import loginVI from '@/locales/vi/login.json';
import mailVI from '@/locales/vi/mail.json';
import profileVI from '@/locales/vi/profile.json';
import registerVI from '@/locales/vi/register.json';
import setPassVI from '@/locales/vi/set_pass.json';
import { ELang } from '@/types/share';

const resources = {
   [ELang.EN]: {
      common: commonEN,
      forms: formsEN,
      register: registerEN,
      login: loginEN,
      layout: layoutEN,
      forgot_pass: forgotPassEN,
      set_pass: setPassEN,
      profile: profileEN,
      mail: mailEN,
   },
   [ELang.VI]: {
      common: commonVI,
      forms: formsVI,
      register: registerVI,
      login: loginVI,
      layout: layoutVI,
      forgot_pass: forgotPassVI,
      set_pass: setPassVI,
      profile: profileVI,
      mail: mailVI,
   },
} as const;

export default resources;
