import channelEn from '@/locales/en/channel.json'
import chatbotsEn from '@/locales/en/chatbots.json'
import commonEN from '@/locales/en/common.json'
import flowDetailEn from '@/locales/en/flow-detail.json'
import forgotPassEN from '@/locales/en/forgot_pass.json'
import formsEN from '@/locales/en/forms.json'
import helpEn from '@/locales/en/help.json'
import landingPageEn from '@/locales/en/landing-page.json'
import layoutEN from '@/locales/en/layout.json'
import loginEN from '@/locales/en/login.json'
import mailEN from '@/locales/en/mail.json'
import profileEN from '@/locales/en/profile.json'
import registerEN from '@/locales/en/register.json'
import setPassEN from '@/locales/en/set_pass.json'
import tableColEn from '@/locales/en/table-cols.json'
import tableEn from '@/locales/en/table.json'
import channelVi from '@/locales/vi/channel.json'
import chatbotsVi from '@/locales/vi/chatbots.json'
import commonVI from '@/locales/vi/common.json'
import flowDetailVi from '@/locales/vi/flow-detail.json'
import forgotPassVI from '@/locales/vi/forgot_pass.json'
import formsVI from '@/locales/vi/forms.json'
import helpVi from '@/locales/vi/help.json'
import landingPageVi from '@/locales/vi/landing-page.json'
import layoutVI from '@/locales/vi/layout.json'
import loginVI from '@/locales/vi/login.json'
import mailVI from '@/locales/vi/mail.json'
import profileVI from '@/locales/vi/profile.json'
import registerVI from '@/locales/vi/register.json'
import setPassVI from '@/locales/vi/set_pass.json'
import tableColVi from '@/locales/vi/table-cols.json'
import tableVi from '@/locales/vi/table.json'
import { ELang } from '@/types/share'

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
    chatbots: chatbotsEn,
    flowDetail: flowDetailEn,
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
    chatbots: chatbotsVi,
    flowDetail: flowDetailVi,
  },
} as const

export default resources
