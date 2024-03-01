import crypto from 'crypto-js';
import dayjs from 'dayjs';

const isObject = (obj: Record<any, any>) =>
   obj != null && obj.constructor.name === 'Object';

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
   scope = [] as string[]
) {
   if (Array.isArray(obj)) {
      obj.forEach((o) => getKeys(o, keepObjKeys, keys, scope), keys);
   } else if (isObject(obj)) {
      Object.keys(obj).forEach((k) => {
         if ((!Array.isArray(obj[k]) && !isObject(obj[k])) || keepObjKeys) {
            const path = scope.concat(k).join('.').replace(/\.\[/g, '[');
            if (!keys.includes(path)) keys.push(path);
         }
         getKeys(obj[k], keepObjKeys, keys, scope.concat(k));
      }, keys);
   }
   return keys;
}

/**
 * Decrypt a string
 * @param text  string to decrypt
 * @returns decrypted string
 */
export const decrypt = (text: string) => {
   return crypto.AES.decrypt(
      text,
      import.meta.env.VITE_SIGNATURE_SECRET
   ).toString(crypto.enc.Utf8);
};
/**
 * Encrypt a string
 * @param text string to encrypt
 * @returns encrypted string
 */
export const encrypt = (text: string) => {
   return crypto.AES.encrypt(
      text,
      import.meta.env.VITE_SIGNATURE_SECRET
   ).toString();
};

/**
 *
 * @param url url to convert to object
 * @returns object
 */
export const queryStringToObject = <T extends Record<any, any>>(
   url: string
): T =>
   JSON.parse(JSON.stringify(Object.fromEntries(new URL(url).searchParams)));

/**
 *
 * @param url URLSearchParams
 * @returns object
 */
export const urlSearchParamsToObject = (url: URLSearchParams) => {
   const obj: Record<any, any> = {};

   url.forEach((value, key) => {
      obj[key] = value;
   });

   return obj;
};

export const objectToUrlSearchParams = (obj: Record<any, any>) => {
   const urlSearchParams = new URLSearchParams();

   for (const key in obj) {
      urlSearchParams.append(key, obj[key]);
   }

   return urlSearchParams;
};

/**
 *
 * @param date date to format
 * @returns formatted date
 */
export const formatDate = (date: string): string => {
   return dayjs(date).format('DD/MM/YYYY HH:mm:ss');
};

export const calcPageCount = (total: number, limit: number) => {
   return Math.ceil(total / limit);
};
