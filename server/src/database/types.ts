import type {
  BuildQueryResult,
  DBQueryConfig,
  ExtractTablesWithRelations,
} from 'drizzle-orm'
import type { NodePgQueryResultHKT } from 'drizzle-orm/node-postgres'
import type { PgTransaction } from 'drizzle-orm/pg-core'
import * as z from 'zod'
import * as schema from './schema'

type Schema = typeof schema
type TSchema = ExtractTablesWithRelations<Schema>

export type IncludeRelation<TableName extends keyof TSchema> = DBQueryConfig<
  'one' | 'many',
  boolean,
  TSchema,
  TSchema[TableName]
>['with']

export type InferResultType<
  TableName extends keyof TSchema,
  With extends IncludeRelation<TableName> | undefined = undefined,
> = BuildQueryResult<
  TSchema,
  TSchema[TableName],
  {
    with: With
  }
>

export type Transaction = PgTransaction<
  NodePgQueryResultHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>

export const ROLES = z.enum(schema.roles.enumValues)

export type TNewUser = typeof schema.users.$inferInsert

export type TUpdateUser = Partial<TNewUser>

export type TNewChannel = typeof schema.channels.$inferInsert

export type TUpdateChannel = Partial<TNewChannel>

export type TNewFlow = typeof schema.flows.$inferInsert

export type TUpdateFlow = Partial<TNewFlow>

export type TNewIntent = typeof schema.intents.$inferInsert

export type TUpdateIntent = Partial<TNewIntent>

export type TNewMessage = typeof schema.messages.$inferInsert
