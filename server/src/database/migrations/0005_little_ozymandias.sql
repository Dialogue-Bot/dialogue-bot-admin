ALTER TABLE "intents" DROP CONSTRAINT "intents_reference_id_unique";--> statement-breakpoint
ALTER TABLE "intents" DROP CONSTRAINT "intents_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "intents" ALTER COLUMN "intents" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "intents" ADD COLUMN "deleted" boolean DEFAULT false;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intents" ADD CONSTRAINT "intents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "intents" DROP COLUMN IF EXISTS "reference_id";