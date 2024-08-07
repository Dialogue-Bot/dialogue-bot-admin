import { config } from 'dotenv'

config({
  path: process.env.NODE_ENV === 'development' ? '.env.development' : undefined,
})

export const CREDENTIALS = process.env.CREDENTIALS === 'true'
export const {
  NODE_ENV,
  PORT,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  DATABASE_URL,
  RESET_PASS_TOKEN_SECRET,
  REDIS_HOST,
  REDIS_PORT,
  FIREBASE_TYPE,
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_CLIENT_ID,
  FIREBASE_AUTH_URI,
  FIREBASE_TOKEN_URI,
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  FIREBASE_CLIENT_X509_CERT_URL,
  FIREBASE_UNIVERSE_DOMAIN,
  FIREBASE_DATABASE_URL,
  SIGNATURE_SECRET,
  PUBLIC_DOMAIN,
  BOT_ENDPOINT,
  MAIL_USER,
  MAIL_PASS,
  API_KEY,
  AUTO_REGISTER_WEBHOOK,
  VERIFY_EMAIL_TOKEN_SECRET,
  STRIPE_SECRET_KEY,
  API_TOKEN,
  STRIPE_ENDPOINT_SECRET,
} = process.env
