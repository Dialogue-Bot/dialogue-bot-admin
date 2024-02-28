import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import {
   boolean,
   json,
   pgEnum,
   pgTable,
   text,
   timestamp,
   uniqueIndex,
   varchar,
} from 'drizzle-orm/pg-core';
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
      password: text('password'),
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

export const channelTypes = pgTable('channel_types', {
   id: varchar('id', {
      length: MAX_ID_LENGTH,
   })
      .primaryKey()
      .$defaultFn(() => createId()),
   name: text('name').unique().notNull(),
   description: text('description').unique().notNull(),
   deleted: boolean('deleted').default(false),
});

export const channels = pgTable('channels', {
   id: varchar('id', {
      length: MAX_ID_LENGTH,
   })
      .primaryKey()
      .$defaultFn(() => createId()),
   contactId: text('contact_id').unique().notNull(),
   contactName: text('contact_name').notNull(),
   credentials: text('credentials'),
   active: boolean('active'),
   deleted: boolean('deleted').default(false),
   channelTypeId: text('channel_type_id').notNull(),
   userId: text('user_id').notNull(),
   createdAt: timestamp('created_at').defaultNow(),
   updatedAt: timestamp('updated_at'),
});

export const channelTypesRelations = relations(channelTypes, ({ many }) => ({
   channels: many(channels),
}));

export const channelsRelations = relations(channels, ({ one }) => ({
   channelType: one(channelTypes, {
      fields: [channels.channelTypeId],
      references: [channelTypes.id],
   }),
   User: one(users, {
      fields: [channels.userId],
      references: [users.id],
   }),
}));

export const settings = pgTable('settings', {
   id: varchar('id', {
      length: MAX_ID_LENGTH,
   })
      .primaryKey()
      .$defaultFn(() => createId()),
   email: json('email')
      .notNull()
      .default({
         email: '',
         password: '',
      })
      .$type<{
         email: string;
         password: string;
      }>(),
   userId: varchar('user_id', {
      length: MAX_ID_LENGTH,
   })
      .notNull()
      .references(() => users.id),
});

export const usersRelations = relations(users, ({ one, many }) => ({
   settings: one(settings),
   channels: many(channels),
}));
