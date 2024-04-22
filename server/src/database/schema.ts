import { IButton, ICard } from '@/interfaces/conversation.interface'
import { IFlowSetting, IFlowVariable } from '@/interfaces/flows.interface'
import { IIntents } from '@/interfaces/intents.interface'
import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import {
  boolean,
  integer,
  json,
  pgEnum,
  pgTable,
  primaryKey,
  real,
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
    isVerified: boolean('is_verified').default(false),
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

export const conversations = pgTable(
  'conversations',
  {
    userId: varchar('user_id', {}).notNull().unique('user_id'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    channelId: text('channel_id')
      .notNull()
      .references(() => channels.id),
    endedAt: timestamp('ended_at').defaultNow(),
  },
  ({ channelId, userId }) => ({
    primaryKey: primaryKey({
      columns: [channelId, userId],
      name: 'conversations_pkey',
    }),
  }),
)

export const messages = pgTable('messages', {
  id: varchar('id', {
    length: MAX_ID_LENGTH,
  })
    .primaryKey()
    .$defaultFn(() => createId()),
  conversationId: varchar('conversation_id', {
    length: MAX_ID_LENGTH,
  })
    .notNull()
    .references(() => conversations.userId, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
  from: text('from').notNull(),
  to: text('to').notNull(),
  type: text('type').notNull().default('text'),
  message: text('message').default(''),
  template: json('template')
    .$type<{
      data?: Array<IButton | ICard>
      type?: string
    }>()
    .default({}),
})

export const plans = pgTable('plans', {
  id: varchar('id', {
    length: MAX_ID_LENGTH,
  })
    .primaryKey()
    .$defaultFn(() => createId()),
  expirationTime: integer('expiration_time').notNull().default(30), // in days (default 30 days)
  maxChannels: integer('max_channels').default(3), // 0 means unlimited
  maxFlows: integer('max_flows').default(3), // 0 means unlimited
  features: json('features').default([]).$type<
    Array<{
      name: string
    }>
  >(),
  name: text('name').notNull(),
  price: real('price').notNull(),
  stripeProductId: text('stripe_product_id').notNull(),
  stripePriceId: text('stripe_price_id').notNull(),
  image: text('image'),
})

export const userSubscriptions = pgTable('user_subscriptions', {
  userId: varchar('user_id', {
    length: MAX_ID_LENGTH,
  })
    .primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }),
  planId: varchar('plan_id', {
    length: MAX_ID_LENGTH,
  })
    .notNull()
    .references(() => plans.id, { onDelete: 'cascade' }),
  startedAt: timestamp('started_at').defaultNow(),
  endedAt: timestamp('ended_at'),
})

export const userSubscriptionsRelations = relations(
  userSubscriptions,
  ({ one }) => ({
    user: one(users, {
      fields: [userSubscriptions.userId],
      references: [users.id],
    }),
    plan: one(plans, {
      fields: [userSubscriptions.planId],
      references: [plans.id],
    }),
  }),
)

export const subscriptionsRelations = relations(plans, ({ many }) => ({
  users: many(userSubscriptions),
}))

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.userId],
  }),
}))

export const conversationsRelations = relations(
  conversations,
  ({ many, one }) => ({
    messages: many(messages),
    user: one(channels, {
      fields: [conversations.userId],
      references: [channels.id],
    }),
    channel: one(channels, {
      fields: [conversations.channelId],
      references: [channels.id],
      relationName: 'channelConversations',
    }),
  }),
)

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
  subscriptions: many(userSubscriptions),
}))

export const channelTypesRelations = relations(channelTypes, ({ many }) => ({
  channels: many(channels),
}))

export const channelsRelations = relations(channels, ({ one, many }) => ({
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
  conversations: many(conversations, {
    relationName: 'channelConversations',
  }),
}))
