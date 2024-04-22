ALTER TABLE "subscriptions" RENAME TO "plans";--> statement-breakpoint
ALTER TABLE "user_subscriptions" DROP CONSTRAINT "user_subscriptions_subscription_id_subscriptions_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_subscription_id_plans_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "plans"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
