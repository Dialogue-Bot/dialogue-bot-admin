// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type {
  BaseTranslation as BaseTranslationType,
  LocalizedString,
  RequiredParams,
} from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales = 'en' | 'vi'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
  /**
   * H​i​ ​{​n​a​m​e​}​!​ ​P​l​e​a​s​e​ ​l​e​a​v​e​ ​a​ ​s​t​a​r​ ​i​f​ ​y​o​u​ ​l​i​k​e​ ​t​h​i​s​ ​p​r​o​j​e​c​t​:​ ​h​t​t​p​s​:​/​/​g​i​t​h​u​b​.​c​o​m​/​i​v​a​n​h​o​f​e​r​/​t​y​p​e​s​a​f​e​-​i​1​8​n
   * @param {string} name
   */
  HI: RequiredParams<'name'>
  AUTH: {
    /**
     * L​o​g​i​n​ ​y​o​u​r​ ​a​c​c​o​u​n​t​ ​s​u​c​c​e​s​s​f​u​l​l​y​!
     */
    LOGIN_SUCCESS: string
    /**
     * Y​o​u​r​ ​a​c​c​o​u​n​t​ ​i​s​ ​n​o​t​ ​f​o​u​n​d​!
     */
    ACCOUNT_NOT_FOUND: string
    /**
     * Y​o​u​r​ ​p​a​s​s​w​o​r​d​ ​i​s​ ​i​n​c​o​r​r​e​c​t​!
     */
    INCORRECT_PASSWORD: string
    /**
     * P​a​s​s​w​o​r​d​ ​d​o​n​'​t​ ​m​a​t​c​h​!
     */
    PASSWORD_UNMATCH: string
    /**
     * Y​o​u​ ​c​a​n​n​o​t​ ​a​c​c​e​s​s​ ​t​h​i​s​ ​r​e​s​o​u​r​c​e​!
     */
    UNAUTHORIZED: string
    /**
     * R​e​g​i​s​t​e​r​ ​y​o​u​r​ ​a​c​c​o​u​n​t​ ​s​u​c​c​e​s​s​f​u​l​l​y​!
     */
    REGISTER_SUCCESS: string
    /**
     * E​m​a​i​l​ ​a​l​r​e​a​d​y​ ​h​a​s​ ​b​e​e​n​ ​u​s​e​d​ ​b​y​ ​a​n​o​t​h​e​r​ ​a​c​c​o​u​n​t​!
     */
    ACCOUNT_EXISTS: string
    /**
     * U​r​l​ ​i​s​ ​i​n​v​a​l​i​d​ ​o​r​ ​e​x​p​i​r​e​d​!​ ​P​l​e​a​s​e​ ​t​r​y​ ​a​g​a​i​n​!
     */
    URL_TOKEN_INVALID: string
    /**
     * T​o​k​e​n​ ​i​s​ ​i​n​v​a​l​i​d​ ​o​r​ ​e​x​p​i​r​e​d​!
     */
    TOKEN_INVALID_OR_EXPIRED: string
    /**
     * R​e​s​e​t​ ​p​a​s​s​w​o​r​d​ ​l​i​n​k​ ​h​a​s​ ​b​e​e​n​ ​s​e​n​t​ ​t​o​ ​y​o​u​r​ ​e​m​a​i​l​!
     */
    FORGOT_PASSWORD_SUCCESS: string
    /**
     * C​h​a​n​g​e​ ​p​a​s​s​w​o​r​d​ ​s​u​c​c​e​s​s​f​u​l​l​y​!
     */
    SET_PASSWORD_SUCCESS: string
    /**
     * R​e​f​r​e​s​h​ ​t​o​k​e​n​ ​s​u​c​c​e​s​s​f​u​l​l​y​!
     */
    REFRESH_TOKEN_SUCCESS: string
    /**
     * T​h​i​s​ ​e​m​a​i​l​ ​i​s​ ​a​l​r​e​a​d​y​ ​u​s​i​n​g​ ​b​y​ ​a​n​o​t​h​e​r​ ​p​r​o​v​i​d​e​r​!
     */
    PROVIDER_EXIST: string
    /**
     * L​o​g​o​u​t​ ​s​u​c​c​e​s​s​f​u​l​l​y​!
     */
    LOGOUT_SUCCESS: string
  }
  USER: {
    /**
     * G​e​t​ ​u​s​e​r​ ​i​n​f​o​ ​s​u​c​c​e​s​s​f​u​l​l​y​!
     */
    GET_USER_SUCCESS: string
    /**
     * U​p​d​a​t​e​d​ ​i​n​f​o​r​m​a​t​i​o​n​ ​s​u​c​c​e​s​s​f​u​l​l​y​!
     */
    UPDATE_INFO_SUCCESS: string
    /**
     * C​h​a​n​g​e​d​ ​p​a​s​s​w​o​r​d​ ​s​u​c​c​e​s​s​f​u​l​l​y​!
     */
    CHANGE_PASSWORD_SUCCESS: string
    /**
     * U​s​e​r​ ​n​o​t​ ​f​o​u​n​d​!
     */
    USER_NOT_FOUND: string
    /**
     * O​l​d​ ​p​a​s​s​w​o​r​d​ ​n​o​t​ ​m​a​t​c​h​!
     */
    OLD_PASSWORD_NOT_MATCH: string
    /**
     * Y​o​u​r​ ​a​c​c​o​u​n​t​ ​u​s​i​n​g​ ​s​o​c​i​a​l​ ​l​o​g​i​n​!​ ​S​o​ ​y​o​u​ ​c​a​n​ ​n​o​t​ ​c​h​a​n​g​e​ ​p​a​s​s​w​o​r​d​!
     */
    USER_NOT_PROVIDER: string
  }
  VALIDATE: {
    /**
     * {​f​i​e​l​d​}​ ​i​s​ ​r​e​q​u​i​r​e​d​!
     * @param {unknown} field
     */
    REQUIRED: RequiredParams<'field'>
    /**
     * I​n​v​a​l​i​d​ ​e​m​a​i​l​!
     */
    INVALID_EMAIL: string
    /**
     * {​f​i​e​l​d​}​ ​m​u​s​t​ ​b​e​ ​a​t​ ​l​e​a​s​t​ ​{​l​e​n​g​t​h​}​ ​c​h​a​r​a​c​t​e​r​s​!
     * @param {unknown} field
     * @param {unknown} length
     */
    MIN_LENGTH: RequiredParams<'field' | 'length'>
    /**
     * {​f​i​e​l​d​}​ ​m​u​s​t​ ​b​e​ ​a​t​ ​m​o​s​t​ ​{​l​e​n​g​t​h​}​ ​c​h​a​r​a​c​t​e​r​s​!
     * @param {unknown} field
     * @param {unknown} length
     */
    MAX_LENGTH: RequiredParams<'field' | 'length'>
    /**
     * P​a​s​s​w​o​r​d​ ​a​n​d​ ​c​o​n​f​i​r​m​ ​p​a​s​s​w​o​r​d​ ​d​o​ ​n​o​t​ ​m​a​t​c​h​!
     */
    CONFIRM_PASSWORD: string
    /**
     * {​f​i​e​l​d​}​ ​m​u​s​t​ ​b​e​ ​a​ ​s​t​r​i​n​g​!
     * @param {unknown} field
     */
    IS_STRING: RequiredParams<'field'>
  }
  COMMON: {
    /**
     * P​a​s​s​w​o​r​d
     */
    PASSWORD: string
    /**
     * E​m​a​i​l
     */
    EMAIL: string
    /**
     * N​a​m​e
     */
    NAME: string
    /**
     * C​o​n​f​i​r​m​ ​p​a​s​s​w​o​r​d
     */
    CONFIRM_PASSWORD: string
    /**
     * O​l​d​ ​p​a​s​s​w​o​r​d
     */
    OLD_PASSWORD: string
  }
  CHANNEL: {
    /**
     * C​r​e​a​t​e​ ​c​h​a​n​n​e​l​ ​f​a​i​l​e​d​!
     */
    CREATE_FAILED: string
    /**
     * C​r​e​a​t​e​ ​c​h​a​n​n​e​l​ ​s​u​c​c​e​s​s​!
     */
    CREATE_SUCCESS: string
    /**
     * C​o​n​t​a​c​t​I​d​ ​e​x​i​s​t​e​d​!
     */
    CONTACTID_EXISTED: string
    /**
     * C​a​n​ ​n​o​t​ ​f​i​n​d​ ​c​h​a​n​n​e​l​!
     */
    NOT_FOUND: string
    /**
     * U​p​d​a​t​e​ ​c​h​a​n​n​e​l​ ​s​u​c​c​e​s​s​!
     */
    UPDATE_SUCCESS: string
    /**
     * U​p​d​a​t​e​ ​c​h​a​n​n​e​l​ ​f​a​i​l​e​d​!
     */
    UPDATE_FAILED: string
    /**
     * D​e​l​e​t​e​ ​c​h​a​n​n​e​l​ ​s​u​c​c​e​s​s​!
     */
    DELETE_CHANNEL_SUCCESS: string
    /**
     * D​e​l​e​t​e​ ​m​u​l​t​i​p​l​e​ ​c​h​a​n​n​e​l​s​ ​s​u​c​c​e​s​s​!
     */
    DELETE_MULTIPLE_CHANNELS_SUCCESS: string
  }
  SETTING: {
    /**
     * E​m​a​i​l​ ​a​n​d​ ​p​a​s​s​w​o​r​d​ ​u​p​d​a​t​e​d​ ​s​u​c​c​e​s​s​f​u​l​l​y​!
     */
    UPDATE_EMAIL_SUCCESS: string
  }
  FLOW: {
    /**
     * C​r​e​a​t​e​ ​f​l​o​w​ ​f​a​i​l​e​d​!
     */
    CREATE_FAILED: string
    /**
     * C​r​e​a​t​e​ ​f​l​o​w​ ​s​u​c​c​e​s​s​!
     */
    CREATE_SUCCESS: string
    /**
     * F​l​o​w​ ​n​a​m​e​ ​e​x​i​s​t​e​d​!
     */
    FLOW_NAME_EXISTED: string
    /**
     * C​a​n​ ​n​o​t​ ​f​i​n​d​ ​f​l​o​w​!
     */
    NOT_FOUND: string
    /**
     * U​p​d​a​t​e​ ​f​l​o​w​ ​s​u​c​c​e​s​s​!
     */
    UPDATE_SUCCESS: string
    /**
     * U​p​d​a​t​e​ ​f​l​o​w​ ​f​a​i​l​e​d​!
     */
    UPDATE_FAILED: string
    /**
     * D​e​l​e​t​e​ ​f​l​o​w​ ​s​u​c​c​e​s​s​!
     */
    DELETE_FLOW_SUCCESS: string
    /**
     * P​u​b​l​i​s​h​ ​f​l​o​w​ ​s​u​c​c​e​s​s​!
     */
    PUBLISH_FLOW_SUCCESS: string
    /**
     * A​d​d​ ​m​u​l​t​i​p​l​e​ ​c​h​a​n​n​e​l​s​ ​f​o​r​ ​f​l​o​w​ ​s​u​c​c​e​s​s​!
     */
    ADD_MULTIPLE_CHANNELS_FLOW__SUCCESS: string
    /**
     * A​d​d​ ​m​u​l​t​i​p​l​e​ ​c​h​a​n​n​e​l​s​ ​f​o​r​ ​f​l​o​w​ ​f​a​i​l​e​d​!
     */
    ADD_MULTIPLE_CHANNELS_FLOW__FAILED: string
  }

  INTENT: {
    /**
     * C​r​e​a​t​e​ ​f​l​o​w​ ​f​a​i​l​e​d​!
     */
    CREATE_FAILED: string
    /**
     * C​r​e​a​t​e​ ​f​l​o​w​ success!
     */
    CREATE_SUCCESS: string
    /**
     * Train name existed​!
     */
    TRAIN_NAME_EXISTED: string
    /**
     * Can not find train!
     */
    NOT_FOUND: string
    /**
     * Update train success​!
     */
    UPDATE_SUCCESS: string
    /**
     * Update train failed!
     */
    UPDATE_FAILED: string
    /**
     * Delete train success!
     */
    DELETE_SUCCESS: string
  }
}

export type TranslationFunctions = {
  /**
   * Hi {name}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n
   */
  HI: (arg: { name: string }) => LocalizedString
  AUTH: {
    /**
     * Login your account successfully!
     */
    LOGIN_SUCCESS: () => LocalizedString
    /**
     * Your account is not found!
     */
    ACCOUNT_NOT_FOUND: () => LocalizedString
    /**
     * Your password is incorrect!
     */
    INCORRECT_PASSWORD: () => LocalizedString
    /**
     * Password don't match!
     */
    PASSWORD_UNMATCH: () => LocalizedString
    /**
     * You cannot access this resource!
     */
    UNAUTHORIZED: () => LocalizedString
    /**
     * Register your account successfully!
     */
    REGISTER_SUCCESS: () => LocalizedString
    /**
     * Email already has been used by another account!
     */
    ACCOUNT_EXISTS: () => LocalizedString
    /**
     * Url is invalid or expired! Please try again!
     */
    URL_TOKEN_INVALID: () => LocalizedString
    /**
     * Token is invalid or expired!
     */
    TOKEN_INVALID_OR_EXPIRED: () => LocalizedString
    /**
     * Reset password link has been sent to your email!
     */
    FORGOT_PASSWORD_SUCCESS: () => LocalizedString
    /**
     * Change password successfully!
     */
    SET_PASSWORD_SUCCESS: () => LocalizedString
    /**
     * Refresh token successfully!
     */
    REFRESH_TOKEN_SUCCESS: () => LocalizedString
    /**
     * This email is already using by another provider!
     */
    PROVIDER_EXIST: () => LocalizedString
    /**
     * Logout successfully!
     */
    LOGOUT_SUCCESS: () => LocalizedString
  }
  USER: {
    /**
     * Get user info successfully!
     */
    GET_USER_SUCCESS: () => LocalizedString
    /**
     * Updated information successfully!
     */
    UPDATE_INFO_SUCCESS: () => LocalizedString
    /**
     * Changed password successfully!
     */
    CHANGE_PASSWORD_SUCCESS: () => LocalizedString
    /**
     * User not found!
     */
    USER_NOT_FOUND: () => LocalizedString
    /**
     * Old password not match!
     */
    OLD_PASSWORD_NOT_MATCH: () => LocalizedString
    /**
     * Your account using social login! So you can not change password!
     */
    USER_NOT_PROVIDER: () => LocalizedString
  }
  VALIDATE: {
    /**
     * {field} is required!
     */
    REQUIRED: (arg: { field: unknown }) => LocalizedString
    /**
     * Invalid email!
     */
    INVALID_EMAIL: () => LocalizedString
    /**
     * {field} must be at least {length} characters!
     */
    MIN_LENGTH: (arg: { field: unknown; length: unknown }) => LocalizedString
    /**
     * {field} must be at most {length} characters!
     */
    MAX_LENGTH: (arg: { field: unknown; length: unknown }) => LocalizedString
    /**
     * Password and confirm password do not match!
     */
    CONFIRM_PASSWORD: () => LocalizedString
    /**
     * {field} must be a string!
     */
    IS_STRING: (arg: { field: unknown }) => LocalizedString
  }
  COMMON: {
    /**
     * Password
     */
    PASSWORD: () => LocalizedString
    /**
     * Email
     */
    EMAIL: () => LocalizedString
    /**
     * Name
     */
    NAME: () => LocalizedString
    /**
     * Confirm password
     */
    CONFIRM_PASSWORD: () => LocalizedString
    /**
     * Old password
     */
    OLD_PASSWORD: () => LocalizedString
  }
  CHANNEL: {
    /**
     * Create channel failed!
     */
    CREATE_FAILED: () => LocalizedString
    /**
     * Create channel success!
     */
    CREATE_SUCCESS: () => LocalizedString
    /**
     * ContactId existed!
     */
    CONTACTID_EXISTED: () => LocalizedString
    /**
     * Can not find channel!
     */
    NOT_FOUND: () => LocalizedString
    /**
     * Update channel success!
     */
    UPDATE_SUCCESS: () => LocalizedString
    /**
     * Update channel failed!
     */
    UPDATE_FAILED: () => LocalizedString
    /**
     * Delete channel success!
     */
    DELETE_CHANNEL_SUCCESS: () => LocalizedString
    /**
     * Delete multiple channels success!
     */
    DELETE_MULTIPLE_CHANNELS_SUCCESS: () => LocalizedString
  }
  SETTING: {
    /**
     * Email and password updated successfully!
     */
    UPDATE_EMAIL_SUCCESS: () => LocalizedString
  }
  FLOW: {
    /**
     * Create flow failed!
     */
    CREATE_FAILED: () => LocalizedString
    /**
     * Create flow success!
     */
    CREATE_SUCCESS: () => LocalizedString
    /**
     * Flow name existed!
     */
    FLOW_NAME_EXISTED: () => LocalizedString
    /**
     * Can not find flow!
     */
    NOT_FOUND: () => LocalizedString
    /**
     * Update flow success!
     */
    UPDATE_SUCCESS: () => LocalizedString
    /**
     * Update flow failed!
     */
    UPDATE_FAILED: () => LocalizedString
    /**
     * Delete flow success!
     */
    DELETE_FLOW_SUCCESS: () => LocalizedString
    /**
     * Publish flow success!
     */
    PUBLISH_FLOW_SUCCESS: () => LocalizedString
    /**
     * Add multiple channels for flow success!
     */
    ADD_MULTIPLE_CHANNELS_FLOW__SUCCESS: () => LocalizedString
    /**
     * Add multiple channels for flow failed!
     */
    ADD_MULTIPLE_CHANNELS_FLOW__FAILED: () => LocalizedString
  }
  INTENT: {
    /**
     * C​r​e​a​t​e​ ​f​l​o​w​ ​f​a​i​l​e​d​!
     */
    CREATE_FAILED: () => LocalizedString
    /**
     * C​r​e​a​t​e​ ​f​l​o​w​ success!
     */
    CREATE_SUCCESS: () => LocalizedString
    /**
     * Train name existed​!
     */
    TRAIN_NAME_EXISTED: () => LocalizedString
    /**
     * Can not find train!
     */
    NOT_FOUND: () => LocalizedString
    /**
     * Update train success​!
     */
    UPDATE_SUCCESS: () => LocalizedString
    /**
     * Update train failed!
     */
    UPDATE_FAILED: () => LocalizedString
    /**
     * Delete train success!
     */
    DELETE_SUCCESS: () => LocalizedString
  }
}

export type Formatters = {}
