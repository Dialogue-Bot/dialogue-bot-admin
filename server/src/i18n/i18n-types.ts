// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'en'
	| 'vi'

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
	}
	USER: {
		/**
		 * G​e​t​ ​u​s​e​r​ ​i​n​f​o​ ​s​u​c​c​e​s​s​f​u​l​l​y​!
		 */
		GET_USER_SUCCESS: string
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
	}
	USER: {
		/**
		 * Get user info successfully!
		 */
		GET_USER_SUCCESS: () => LocalizedString
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
		MIN_LENGTH: (arg: { field: unknown, length: unknown }) => LocalizedString
		/**
		 * {field} must be at most {length} characters!
		 */
		MAX_LENGTH: (arg: { field: unknown, length: unknown }) => LocalizedString
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
	}
}

export type Formatters = {}
