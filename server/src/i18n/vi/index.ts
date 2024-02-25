import type { Translation } from '../i18n-types';
import { AUTH } from './auth';
import { CHANNEL } from './channel';
import { COMMON } from './common';
import { SETTING } from './setting';
import { USER } from './user';
import { VALIDATE } from './validate';
const vi = {
   // this is an example Translation, just rename or delete this folder if you want
   HI: 'Hallo {name}! toi la hoang huy',
   AUTH,
   USER,
   COMMON,
   //@ts-ignore
   VALIDATE,
   CHANNEL,
   SETTING
} satisfies Translation;

export default vi;
