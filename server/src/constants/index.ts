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
      CURRENT_USER: '/auth/current-user',
      REFRESH_TOKEN: '/auth/refresh-token',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
   },
   UPLOAD: {
      SINGLE: '/upload/single',
      MULTIPLE: '/upload/multiple',
   },
   CHANNEL: {
      INDEX: '/channel',
      DELETE: '/channel/delete',
      DELETES: '/channel/deletes',
   }
};

export const LOCALE_KEY = 'lang';
