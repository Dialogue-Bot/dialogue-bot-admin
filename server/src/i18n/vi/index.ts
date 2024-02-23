import type { Translation } from '../i18n-types';
import { AUTH } from './auth';
import { USER } from './user';
import { VALIDATE } from './validate';
import { COMMON } from './common';
const vi = {
   // this is an example Translation, just rename or delete this folder if you want
   HI: 'Hallo {name}! toi la hoang huy',
   AUTH,
   USER,
   COMMON,
   //@ts-ignore
   VALIDATE,
} satisfies Translation;

export default vi;
