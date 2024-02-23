import type { BaseTranslation } from '../i18n-types';
import { AUTH } from './auth';
import { USER } from './user';
import { VALIDATE } from './validate';
import { COMMON } from './common';
const en = {
   // TODO: your translations go here
   HI: 'Hi {name:string}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n',
   AUTH,
   USER,
   VALIDATE,
   COMMON,
} satisfies BaseTranslation;

export default en;
