import { SIGNATURE_SECRET } from '@/config';
import crypto from 'crypto-js';

export const decrypt = (text: string) => {
   return crypto.AES.decrypt(text, SIGNATURE_SECRET).toString(crypto.enc.Utf8);
};

export const encrypt = (text: string) => {
   return crypto.AES.encrypt(text, SIGNATURE_SECRET).toString();
};
