import { SIGNATURE_SECRET } from '@/config'
import crypto from 'crypto-js'

/**
 * Decrypts the given text using the SIGNATURE_SECRET.
 *
 * @param text - The text to decrypt.
 * @returns The decrypted text.
 * @example
 * const decrypted = decrypt('encrypted text');
 */
export const decrypt = (text: string) => {
  return crypto.AES.decrypt(text, SIGNATURE_SECRET).toString(crypto.enc.Utf8)
}

/**
 * Encrypts the given text using AES encryption algorithm.
 * @param text - The text to be encrypted.
 * @returns The encrypted text.
 * @example
 * const encrypted = encrypt('text');
 */
export const encrypt = (text: string) => {
  return crypto.AES.encrypt(text, SIGNATURE_SECRET).toString()
}
