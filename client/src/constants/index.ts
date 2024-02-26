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
};
