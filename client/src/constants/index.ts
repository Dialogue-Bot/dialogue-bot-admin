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
    VERIFY_ACCOUNT: '/auth/verify-account',
    REQUEST_VERIFY_ACCOUNT: '/auth/request-verify-account',
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
  PLANS: {
    INDEX: '/plans',
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
    FOR_TEST: '/channel/for-test',
  },
  SUBSCRIPTIONS: {
    INDEX: '/subscriptions',
    CREATE_CHECKOUT_SESSION: '/subscriptions/create-checkout-session',
    CREATE_BILLING_PORTAL_SESSION:
      '/subscriptions/create-billing-portal-session',
  },
  FLOW: {
    INDEX: '/flow',
    GET_ONE: '/flow/get-one',
    PUBLISH: '/flow/publish-flow',
    ADD_CHANNELS: '/flow/add-channels',
    SELECT_FLOWS_FOR_CHANNEL: '/flow/select',
  },
  INTENT: {
    INDEX: '/intent',
    DELETE: '/intent/delete',
    FOR_SELECT: '/intent/for-select',
  },
  CONVERSATION_LIVE_CHAT: {
    INDEX: '/conversation-live-chat',
    GET_MESSAGES: '/conversation-live-chat/:id',
  },
  USER_SUBSCRIPTIONS: {
    INDEX: '/user-subscriptions',
    CURRENT: '/user-subscriptions/current',
    USAGE: '/user-subscriptions/usage',
  },
  CUSTOM_CHATBOX: {
    INDEX: '/custom-chatbox/:channelId',
  },
}

export const ROUTES = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASS: '/forgot-password',
    RESET_PASS: '/set-password',
    REQUEST_VERIFY_ACCOUNT: '/request-verify-account',
    VERIFY_ACCOUNT: '/verify-account',
  },
  PUBLIC: {
    LANDING_PAGE: '/',
    HELP: '/help',
    CHECKOUT_SUCCESS: '/checkout-success',
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
    FLOW: {
      INDEX: '/flows',
    },
    SETTING: {
      INDEX: '/settings',
      MAIL: '/settings/mail',
      PROFILES: '/settings/profiles',
    },
    TRAINING: {
      INDEX: '/training',
      ADD_INTENT: '/training/add-intent',
    },
    CONVERSATION: {
      INDEX: '/conversations',
    },
    USER_SUBSCRIPTION: {
      INDEX: '/user-subscriptions',
    },
    PREVIEW_CHATBOX: '/preview-chatbox',
  },
}

export const LANGS: Record<string, string> = {
  vi: i18n.t('common:langs.vi'),
  en: i18n.t('common:langs.en'),
}

export const CONDITIONAL_OPERATOR = [
  'equal',
  'not_equal',
  'greater_than',
  'greater_than_or_equal',
  'less_than',
  'less_than_or_equal',
  'contains',
  'not_contains',
  'match',
  'not_match',
  'exist',
]

export const NOT_CHOOSE = 'NOT_CHOOSE'
