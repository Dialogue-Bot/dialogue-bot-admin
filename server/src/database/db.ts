import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import type { LogWriter } from 'drizzle-orm/logger';
import { DefaultLogger } from 'drizzle-orm/logger';
import { logger } from '@/utils/logger';
import * as schema from './schema';

class Logger implements LogWriter {
   write(message: string): void {
      logger.info(`[DATABASE] ${message}`);
   }
}

export const client = new Pool({
   connectionString: 'postgres://postgres:postgres@localhost:5432/server_bot',
});

export const db = drizzle(client, {
   schema,
   logger: new DefaultLogger({ writer: new Logger() }),
});

export type DB = typeof db;
