export const MIN_PASSWORD_LENGTH = 8
export const MAX_PASSWORD_LENGTH = 32
export const MAX_ID_LENGTH = 36
export const TIME_EXPIRED_REFRESH_TOKEN = 60 * 60 * 24 * 7 // 7 days
export const TIME_EXPIRED_RESET_PASSWORD_TOKEN = 60 * 60 * 2 // 2 hours
export const TIME_EXPIRED_ACCESS_TOKEN = 60

// QUEUE KEY
export const QUEUE_KEYS = {
  SEND_EMAIL: 'SEND_EMAIL',
}

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
  CUSTOM_CHATBOX: {
    INDEX: '/custom-chatbox',
  },
  UPLOAD: {
    SINGLE: '/upload/single',
    MULTIPLE: '/upload/multiple',
  },
  PLANS: {
    INDEX: '/plans',
  },
  SUBSCRIPTIONS: {
    INDEX: '/subscriptions',
    CREATE_CHECKOUT_SESSION: '/subscriptions/create-checkout-session',
    CREATE_BILLING_PORTAL_SESSION:
      '/subscriptions/create-billing-portal-session',
  },
  USER_SUBSCRIPTIONS: {
    INDEX: '/user-subscriptions',
    CURRENT: '/user-subscriptions/current',
    USAGE: '/user-subscriptions/usage',
  },
  CHANNEL: {
    INDEX: '/channel',
    DELETE: '/channel/delete',
    DELETES: '/channel/deletes',
    TYPES: '/channel/types',
    FOR_TEST: '/channel/for-test',
  },
  SETTING: {
    INDEX: '/setting',
    MAIL: '/setting/email',
    BY_CONTACT_ID: '/setting/by-contact-id/:contactId',
    TEST_SEND_MAIL: '/setting/test-send-mail',
  },
  USER: {
    UPDATE_INFO: '/user/update-info',
    CHANGE_PASSWORD: '/user/change-password',
  },
  WEBHOOK: {
    INDEX: '/webhook',
    VERIFY: '/webhook/:contactId',
    INCOMING_MSG: '/webhook/:contactId',
  },
  STRIPE_WEBHOOK: {
    INDEX: '/stripe-webhook',
    PAYMENT_INTENT: '/stripe-webhook/payment-intent',
  },
  CONVERSATION: {
    INDEX: '/v3/conversations/:conversationId/activities/:activity',
  },
  FLOW: {
    INDEX: '/flow',
    GET_ONE: '/flow/get-one',
    PUBLISH: '/flow/publish-flow',
    ADD_CHANNELS: '/flow/add-channels',
    SELECT_FLOWS_FOR_CHANNEL: '/flow/select',
    BOT_GET_CONTACT_ID: '/bot/flow/:contactId',
    BOT_GET_ID: '/bot/flow/:id',
    TEMPLATES: '/flow/templates',
    DUPLICATE_TEMPLATE: '/flow/duplicate-template',
  },
  INTENT: {
    INDEX: '/intent',
    PREDICT: '/intent/predict',
    FOR_SELECT: '/intent/for-select',
    TEST: '/intent/test',
  },
  CONVERSATION_LIVE_CHAT: {
    INDEX: '/conversation-live-chat',
    GET_MESSAGES: '/conversation-live-chat/:userId/:contactId',
  },
  BOT_MAIL: {
    SEND_MAIL: '/bot-mail/send',
  },
}

export const LOCALE_KEY = 'lang'

export const SOCKET_EVENTS = {
  MESSAGE: 'message',
  RECEIVED: 'received',
  DISCONNECT: 'disconnect',
  DISABLED_BOT: 'disabled-bot',
  AGENT_MESSAGE: 'agent-message',
}

export const TEST_YOUR_BOT_CHANNEL = 'TESTYOURBOT'

export const BOT_EVENT = {
  MESSAGE: 'message',
  IMAGE: 'image',
  TYPING: 'typing',
  STOP_TYPING: 'stop-typing',
}

export const FLOWS_TEMPLATE = ['Shopping Online']
