import { config } from 'dotenv'
import type { Config } from 'drizzle-kit'

config({
  path: process.env.NODE_ENV === 'development' ? '.env.development' : undefined,
})

export default {
  schema: './src/database/schema.ts',
  out: './src/database/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config
