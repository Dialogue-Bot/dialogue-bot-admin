import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import {
   boolean,
   integer,
   json,
   pgEnum,
   pgTable,
   serial,
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

export const channelTypes = pgTable(
   'channel_types', // cho nay minh theo conversation channel_types nha
   {
      id: serial('id').primaryKey(),
      name: text('name').unique().notNull(),
      description: text('description').unique().notNull(),
   }
);

export const channels = pgTable('channels', {
   id: serial('id').primaryKey(),
   contactId: text('contact_id').unique().notNull(),
   contactName: text('contact_name').notNull(),
   credentials: json('credentials'),
   active: boolean('active').default(true),
   channelTypeId: integer('channel_type_id').notNull(),
   createdAt: timestamp('created_at').defaultNow(),
   updatedAt: timestamp('update_at').defaultNow(),
});

export const channelTypesRelations = relations(channelTypes, ({ many }) => ({
   channels: many(channels),
}));

export const channelsRelations = relations(channels, ({ one }) => ({
   channelType: one(channelTypes, {
      fields: [channels.channelTypeId],
      references: [channelTypes.id],
   }),
}));
