import {
   integer,
   pgEnum,
   pgTable,
   text,
   timestamp,
   varchar,
   doublePrecision,
   boolean,
   index,
   uniqueIndex,
   primaryKey,
} from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { MAX_ID_LENGTH } from '../constants';

export const roles = pgEnum('roles', ['ADMIN', 'USER']);

export const users = pgTable(
   'users',
   {
      id: varchar('id', {
         length: MAX_ID_LENGTH,
      })
         .primaryKey()
         .$defaultFn(() => createId()),
      email: text('email').unique().notNull(),
      password: text('password').notNull(),
      name: text('name').notNull(),
      avatar: text('avatar'),
      roles: roles('role')
         .array()
         .$defaultFn(() => ['USER'])
         .notNull(),
      provider: text('provider').notNull().default('local'),
   },
   (table) => ({
      emailIdx: uniqueIndex('email_idx').on(table.email),
   })
);
