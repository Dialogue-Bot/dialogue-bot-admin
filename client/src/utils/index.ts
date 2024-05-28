import { API_URL, SIGNATURE_SECRET } from '@/constants'
import { TCustomChatBox } from '@/types/custom-chatbox'
import crypto from 'crypto-js'
import dayjs from 'dayjs'
import _ from 'lodash'

const isObject = (obj: Record<any, any>) =>
  obj != null && obj.constructor.name === 'Object'

/**
 * Get all keys from an object or array
 * @param obj  object to get keys from
 * @param keepObjKeys  - keep object keys in the result
 * @param keys  array to store keys
 * @param scope  array to store the path
 * @returns array of keys
 */
export function getKeys(
  obj: Record<any, any> | any[],
  keepObjKeys: boolean = false,
  keys = [] as string[],
  scope = [] as string[],
) {
  if (Array.isArray(obj)) {
    obj.forEach((o) => getKeys(o, keepObjKeys, keys, scope), keys)
  } else if (isObject(obj)) {
    Object.keys(obj).forEach((k) => {
      if ((!Array.isArray(obj[k]) && !isObject(obj[k])) || keepObjKeys) {
        const path = scope.concat(k).join('.').replace(/\.\[/g, '[')
        if (!keys.includes(path)) keys.push(path)
      }
      getKeys(obj[k], keepObjKeys, keys, scope.concat(k))
    }, keys)
  }
  return keys
}

/**
 * Decrypt a string
 * @param text  string to decrypt
 * @returns decrypted string
 */
export const decrypt = (text: string) => {
  return crypto.AES.decrypt(text, SIGNATURE_SECRET).toString(crypto.enc.Utf8)
}
/**
 * Encrypt a string
 * @param text string to encrypt
 * @returns encrypted string
 */
export const encrypt = (text: string) => {
  return crypto.AES.encrypt(text, SIGNATURE_SECRET).toString()
}

/**
 *
 * @param url url to convert to object
 * @returns object
 */
export const queryStringToObject = <T extends Record<any, any>>(
  url: string,
): T =>
  JSON.parse(JSON.stringify(Object.fromEntries(new URL(url).searchParams)))

/**
 *
 * @param url URLSearchParams
 * @returns object
 */
export const urlSearchParamsToObject = (url: URLSearchParams) => {
  const obj: Record<any, any> = {}

  url.forEach((value, key) => {
    obj[key] = value
  })

  return obj
}

export const objectToUrlSearchParams = (obj: Record<any, any>) => {
  const urlSearchParams = new URLSearchParams()

  for (const key in obj) {
    urlSearchParams.append(key, obj[key])
  }

  return urlSearchParams
}

/**
 *
 * @param date date to format
 * @returns formatted date
 */
export const formatDate = (date: string): string => {
  return dayjs(date).format('DD/MM/YYYY HH:mm:ss')
}

export const calcPageCount = (total: number, limit: number) => {
  return Math.ceil(total / limit)
}

export const isStringNumber = (value: string) => {
  return /^\d+$/.test(value)
}

export const isStringBoolean = (value: string) => {
  return value === 'true' || value === 'false'
}

export const toBoolean = (value: string | number) => {
  if (typeof value === 'number') return Boolean(value)

  if (typeof value === 'string') {
    if (value === 'true') return true
    if (value === 'false') return false
  }

  return Boolean(value)
}

export const isStringArray = (value: string) => {
  return /^[^\n\r]*([^,\s\n\r]+(\s*,\s*[^,\s\n\r]+)+)[^\n\r]*$/g.test(value)
}

/**
 * Converts a comma-separated string into an array of values.
 * If the string contains numeric or boolean values, they will be converted accordingly.
 * @param value - The string to convert into an array.
 * @returns An array of values.
 * @throws {Error} If the input string is not a valid array.
 */
export const toArray = (value: string) => {
  if (!isStringArray(value)) throw new Error('Invalid array')

  return value.split(',').map((v) => {
    if (isStringNumber(v)) return Number(v)
    if (isStringBoolean(v)) return toBoolean(v)
    return v
  })
}

/**
 * Checks if a given value is a valid JSON string.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a valid JSON string, `false` otherwise.
 */
export const isStringObject = (value: string) => {
  try {
    JSON.parse(value)
    return true
  } catch (error) {
    return false
  }
}

/**
 * Removes specified fields from an object and returns a new object.
 *
 * @template T - The type of the object.
 * @param obj - The object from which to remove fields.
 * @param fields - An array of field names to be excluded from the object.
 * @returns A new object with the specified fields removed.
 */
export const setValueObjectExcludeFields = <
  T extends Record<any, any> = Record<any, any>,
>(
  obj: T,
  fields: (keyof T)[],
) => {
  const newObj = _.cloneDeep(obj)

  fields.forEach((field) => {
    delete newObj[field]
  })

  return newObj
}

/**
 * Checks if an object is empty.
 * @param obj - The object to check.
 * @returns True if the object is empty, false otherwise.
 */
export const isEmptyObject = (obj: Record<any, any>) => {
  return Object.keys(obj).length === 0
}

/**
 * Generates a script tag for embedding a chatbox.
 * @param contactId - The ID of the contact.
 * @param custom - Optional custom chatbox configuration.
 * @returns The script tag as a string.
 */
export const genScript = (contactId: string, custom?: TCustomChatBox) => {
  return `<script src="${API_URL}/public/script/chatbox.js" channelId="${contactId}" id="${contactId}" async type="text/javascript" custom="${JSON.stringify(custom)}"></script>`
}

export const genMessengerCallback = (contactId: string) => {
  return `${API_URL}/api/webhook/${contactId}`
}
