import { IFlowSetting, IFlowVariable } from '@/interfaces/flows.interface'
import { IIntents } from '@/interfaces/intents.interface'
import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import {
  boolean,
  json,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core'
import { MAX_ID_LENGTH } from '../constants'

export const roles = pgEnum('roles', ['ADMIN', 'USER'])

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
  }),
)

export const channelTypes = pgTable('channel_types', {
  id: varchar('id', {
    length: MAX_ID_LENGTH,
  })
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').unique().notNull(),
  description: text('description').unique().notNull(),
  deleted: boolean('deleted').default(false),
})

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
  channelTypeId: text('channel_type_id')
    .notNull()
    .references(() => channelTypes.id),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  flowId: text('flow_id').references(() => flows.id, {
    onDelete: 'set null',
  }),
})

export const channelTypesRelations = relations(channelTypes, ({ many }) => ({
  channels: many(channels),
}))

export const channelsRelations = relations(channels, ({ one }) => ({
  channelType: one(channelTypes, {
    fields: [channels.channelTypeId],
    references: [channelTypes.id],
  }),
  user: one(users, {
    fields: [channels.userId],
    references: [users.id],
  }),
  flow: one(flows, {
    fields: [channels.flowId],
    references: [flows.id],
  }),
}))

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
      email: string
      password: string
    }>(),
  userId: varchar('user_id', {
    length: MAX_ID_LENGTH,
  })
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),
})

export const flows = pgTable('flows', {
  id: varchar('id', {
    length: MAX_ID_LENGTH,
  })
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  userId: varchar('user_id', {
    length: MAX_ID_LENGTH,
  })
    .notNull()
    .references(() => users.id),
  deleted: boolean('deleted').default(false),
  updatedAt: timestamp('updated_at'),
  createdAt: timestamp('created_at').defaultNow(),
  edges: json('edges').default([]).$type<Array<Record<any, any>>>(),
  nodes: json('nodes').default([]).$type<Array<Record<any, any>>>(),
  settings: json('settings').default([]).$type<Array<IFlowSetting>>(),
  variables: json('variables').default([]).$type<Array<IFlowVariable>>(),
  flows: json('flows').default([]).$type<any[]>(),
  publishAt: timestamp('publish_at'),
})

export const flowsRelations = relations(flows, ({ one, many }) => ({
  channels: many(channels),
  user: one(users, {
    fields: [flows.userId],
    references: [users.id],
  }),
}))

export const intents = pgTable('intents', {
  id: varchar('id', {
    length: MAX_ID_LENGTH,
  })
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  referenceId: text('reference_id').notNull(),
  intents: json('intents').default([]).$type<Array<IIntents>>(),
  entities: json('entities').notNull().default([]).$type<any[]>(),
  userId: varchar('user_id', {
    length: MAX_ID_LENGTH,
  })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  deleted: boolean('deleted').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const intentsRelations = relations(intents, ({ one }) => ({
  user: one(users, {
    fields: [intents.userId],
    references: [users.id],
  }),
}))

export const usersRelations = relations(users, ({ one, many }) => ({
  settings: one(settings, {
    relationName: 'userSettings',
    fields: [users.id],
    references: [settings.userId],
  }),
  channels: many(channels),
  flows: many(flows),
  intents: many(intents),
}))
