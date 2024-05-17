import channelEn from '@/locales/en/channel.json'
import chatbotsEn from '@/locales/en/chatbots.json'
import commonEN from '@/locales/en/common.json'
import conversationsEn from '@/locales/en/conversations.json'
import errorPageEn from '@/locales/en/error-page.json'
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
import requestVerifyAccountEn from '@/locales/en/request-verify-account.json'
import setPassEN from '@/locales/en/set_pass.json'
import tableColEn from '@/locales/en/table-cols.json'
import tableEn from '@/locales/en/table.json'
import trainingEn from '@/locales/en/training.json'
import userSubscriptionsEn from '@/locales/en/user-subscription.json'
import verifyAccountEn from '@/locales/en/verify-account.json'
import channelVi from '@/locales/vi/channel.json'
import chatbotsVi from '@/locales/vi/chatbots.json'
import commonVI from '@/locales/vi/common.json'
import conversationsVi from '@/locales/vi/conversations.json'
import errorPageVi from '@/locales/vi/error-page.json'
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
import requestVerifyAccountVi from '@/locales/vi/request-verify-account.json'
import setPassVI from '@/locales/vi/set_pass.json'
import tableColVi from '@/locales/vi/table-cols.json'
import tableVi from '@/locales/vi/table.json'
import trainingVi from '@/locales/vi/training.json'
import userSubscriptionsVi from '@/locales/vi/user-subscription.json'
import verifyAccountVi from '@/locales/vi/verify-account.json'
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
    flows: chatbotsEn,
    flowDetail: flowDetailEn,
    training: trainingEn,
    requestVerifyAccount: requestVerifyAccountEn,
    verifyAccount: verifyAccountEn,
    conversations: conversationsEn,
    userSubscriptions: userSubscriptionsEn,
    errorPage: errorPageEn,
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
    flows: chatbotsVi,
    flowDetail: flowDetailVi,
    training: trainingVi,
    requestVerifyAccount: requestVerifyAccountVi,
    verifyAccount: verifyAccountVi,
    conversations: conversationsVi,
    userSubscriptions: userSubscriptionsVi,
    errorPage: errorPageVi,
  },
} as const

export default resources
