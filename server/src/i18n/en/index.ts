import type { BaseTranslation } from '../i18n-types';
import { AUTH } from './auth';
import { CHANNEL } from './channel';
import { COMMON } from './common';
import { USER } from './user';
import { VALIDATE } from './validate';
const en = {
   // TODO: your translations go here
   HI: 'Hi {name:string}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n',
   AUTH,
   USER,
   VALIDATE,
   COMMON,
   CHANNEL,
} satisfies BaseTranslation;

export default en;