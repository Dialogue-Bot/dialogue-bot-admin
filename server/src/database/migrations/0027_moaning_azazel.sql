ALTER TABLE "user_subscriptions" RENAME COLUMN "subscription_id" TO "plan_id";--> statement-breakpoint
ALTER TABLE "user_subscriptions" DROP CONSTRAINT "user_subscriptions_subscription_id_plans_id_fk";
--> statement-breakpoint
ALTER TABLE "user_subscriptions" ALTER COLUMN "id" SET DEFAULT 'w3q3wpsxl30jegakkcxc8qdf';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
