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
    TEST_SEND_MAIL: '/setting/test-send-mail',
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
    TEST: '/intent/test',
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

export const SOCKET_EVENTS = {
  MESSAGE: 'message',
  RECEIVED: 'received',
  DISCONNECT: 'disconnect',
  DISABLED_BOT: 'disabled-bot',
  NOTIFICATION_CONNECT_AGENT: 'notification-connect-agent',
  AGENT_MESSAGE: 'agent-message',
}

// export const API_URL = import.meta.env.DEV
//   ? 'http://localhost:8080'
//   : 'https://api.dialoguebot.tech'

export const API_URL = 'http://localhost:8080'

export const SIGNATURE_SECRET = 'iR5WkkMmQwUP7AeMkYxXYjQNVaWMAhPk'
export const STRIPE_PUBLIC_KEY =
  'pk_test_51P7hh8P3qr7u2BY3gr9HKIsisgiWEhpuRw6mNuDFf3NVZYjXfGK5N52TId330OffJWCUE4NU1kvaOKyX7gKjojxL00curHowAO'

export const NEW_USER_STORED = 'NEW_USER_STORED'
export const EMAIL_TO_FILL_RESET_PASS = 'EMAIL_TO_FILL_RESET_PASS'
export const FIST_TIME_SET_PASS = 'FIST_TIME_SET_PASS'
