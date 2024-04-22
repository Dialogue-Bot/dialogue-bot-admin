ALTER TABLE "user_subscriptions" DROP CONSTRAINT "user_subscriptions_pkey";--> statement-breakpoint
ALTER TABLE "user_subscriptions" ALTER COLUMN "id" SET DEFAULT 'r4trp5y5pke3m6g3v1fazrc8';--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_subscription_unique" ON "user_subscriptions" ("user_id","subscription_id");