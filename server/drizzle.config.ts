import { config } from 'dotenv'
import type { Config } from 'drizzle-kit'

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` })

export default {
  schema: './src/database/schema.ts',
  out: './src/database/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config
