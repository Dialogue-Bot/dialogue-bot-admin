import 'dotenv/config';
import type { Config } from 'drizzle-kit';
export default {
   schema: './src/database/schema.ts',
   out: './src/database/migrations',
   driver: 'pg',
   dbCredentials: {
      connectionString:
         'postgres://postgres:postgres@localhost:5432/server_bot',
   },
} satisfies Config;
