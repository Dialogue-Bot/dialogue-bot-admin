import i18n from '@/i18n'

export const ENDPOINTS = {
  AUTH: {
    INDEX: '/auth',
    LOGIN: '/auth/login',
    LOGIN_ADMIN: '/auth/login-admin',
    REGISTER: '/auth/register',
    CURRENT_USER: '/auth/me',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    WITH_ID_TOKEN: '/auth/with-id-token',
    LOGOUT: '/auth/logout',
  },
  UPLOAD: {
    SINGLE: '/upload/single',
    MULTIPLE: '/upload/multiple',
  },
  USER: {
    INDEX: '/user',
    UPDATE_INFO: '/user/update-info',
    CHANGE_PASS: '/user/change-password',
  },
  SETTING: {
    INDEX: '/setting',
    MAIL: '/setting/email',
  },
  CHANNEL: {
    INDEX: '/channel',
    DELETE: '/channel/delete',
    DELETES: '/channel/deletes',
    TYPES: '/channel/types',
  },
  FLOW: {
    INDEX: '/flow',
    GET_ONE: '/flow/get-one',
    PUBLISH: '/flow/publish-flow',
    ADD_CHANNELS: '/flow/add-channels',
    SELECT_FLOWS_FOR_CHANNEL: '/flow/select',
  },
}

export const ROUTES = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASS: '/forgot-password',
    RESET_PASS: '/set-password',
  },
  PUBLIC: {
    LANDING_PAGE: '/',
    HELP: '/help',
  },
  PRIVATE: {
    DASHBOARD: '/dashboard',
    CHANNEL: {
      INDEX: '/channels',
      CREATE: '/channels/create',
      EDIT: '/channels/edit',
    },
    CHAT_BOT: {
      INDEX: '/chatbots',
    },
    SETTING: {
      INDEX: '/settings',
      MAIL: '/settings/mail',
      PROFILES: '/settings/profiles',
    },
  },
}

export const LANGS: Record<string, string> = {
  vi: i18n.t('common:langs.vi'),
  en: i18n.t('common:langs.en'),
}
