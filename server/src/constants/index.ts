export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 32;
export const MAX_ID_LENGTH = 36;
export const TIME_EXPIRED_REFRESH_TOKEN = 60 * 60 * 24 * 30;
export const TIME_EXPIRED_RESET_PASSWORD_TOKEN = 60 * 60 * 24;
export const TIME_EXPIRED_ACCESS_TOKEN = 60 * 60 * 24;

// QUEUE KEY
export const QUEUE_KEYS = {
   SEND_EMAIL: 'SEND_EMAIL',
};

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
   CHANNEL: {
      INDEX: '/channel',
      DELETE: '/channel/delete',
      DELETES: '/channel/deletes',
      TYPES: '/channel/types',
   },
   SETTING: {
      INDEX: '/setting',
      MAIL: '/setting/email',
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
   CONVERSATION: {
      INDEX: '/v3/conversations'
   }
};

export const LOCALE_KEY = 'lang';
