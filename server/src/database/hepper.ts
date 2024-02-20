import { sql } from 'drizzle-orm';
import type { AnyColumn, AnyTable, SQL, InferSelectModel } from 'drizzle-orm';
import type {
   PgColumn,
   PgTable,
   SelectedFields,
   TableConfig,
} from 'drizzle-orm/pg-core';
import type { SelectResultFields } from 'drizzle-orm/query-builders/select.types';
import { omit } from 'lodash';

export function distinctOn<Column extends AnyColumn>(column: Column) {
   return sql<Column['_']['data']>`distinct on (${column}) ${column}`;
}

export function jsonBuildObject<T extends SelectedFields>(shape: T) {
   const chunks: SQL[] = [];

   Object.entries(shape).forEach(([key, value]) => {
      if (chunks.length > 0) {
         chunks.push(sql.raw(`,`));
      }
      chunks.push(sql.raw(`'${key}',`));
      chunks.push(sql`${value}`);
   });

   return sql<SelectResultFields<T>>`coalesce(jsonb_build_object(${sql.join(
      chunks
   )}), '{}')`;
}

export function jsonAggBuildDistinctObject<
   T extends SelectedFields,
   Table extends AnyTable<TableConfig>
>(shape: T, table: Table) {
   return sql<SelectResultFields<T>[]>`
        jsonb_agg(
           distinct ${jsonBuildObject(shape)} 
        ) filter (where ${table} is not null)
    `;
}
export function jsonAggBuildObject<
   T extends SelectedFields,
   Column extends AnyColumn,
   Table extends AnyTable<TableConfig>
>(
   shape: T,
   table: Table,
   options?: { orderBy?: { colName: Column; direction: 'ASC' | 'DESC' } }
) {
   return sql<SelectResultFields<T>[]>`coalesce(jsonb_agg(${jsonBuildObject(
      shape
   )}${
      options?.orderBy
         ? sql`order by ${options.orderBy.colName} ${sql.raw(
              options.orderBy.direction
           )}`
         : undefined
   }) filter (where ${table} is not null), '${sql`[]`}')`;
}

export function jsonAgg<Table extends AnyTable<TableConfig>>(table: Table) {
   return sql<
      InferSelectModel<Table>[]
   >`json_agg(${table}) filter (where ${table} is not null)`;
}

export function selectAllFields<Table extends PgTable>(table: Table) {
   const _table = omit(table, ['_', '$inferInsert', '$inferSelect', 'getSQL']);
   const result: Record<string, PgColumn> = {};

   Object.entries(_table).forEach(([key, value]) => {
      result[key] = value as any;
   });

   return result;
}

export const nullIsNull = sql`null is null`;

export const count = sql<number>`count(*)`;
