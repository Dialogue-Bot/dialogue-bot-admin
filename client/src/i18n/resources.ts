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
import tableColEn from '@/locales/en/table-cols.json';
import tableColVi from '@/locales/vi/table-cols.json';
import channelEn from '@/locales/en/channel.json';
import channelVi from '@/locales/vi/channel.json';
import tableEn from '@/locales/en/table.json';
import tableVi from '@/locales/vi/table.json';
import landingPageEn from '@/locales/en/landing-page.json';
import landingPageVi from '@/locales/vi/landing-page.json';
import helpEn from '@/locales/en/help.json';
import helpVi from '@/locales/vi/help.json';

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
      tableCols: tableColEn,
      channel: channelEn,
      dataTable: tableEn,
      landingPage: landingPageEn,
      help: helpEn,
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
      tableCols: tableColVi,
      channel: channelVi,
      dataTable: tableVi,
      landingPage: landingPageVi,
      help: helpVi,
   },
} as const;

export default resources;
