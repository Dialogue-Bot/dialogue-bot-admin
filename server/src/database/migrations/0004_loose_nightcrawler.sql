CREATE TABLE IF NOT EXISTS "intents" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"reference_id" text NOT NULL,
	"intents" json DEFAULT '[]'::json NOT NULL,
	"entities" json DEFAULT '[]'::json NOT NULL,
	"user_id" varchar(36) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "intents_reference_id_unique" UNIQUE("reference_id")
);
--> statement-breakpoint
ALTER TABLE "flows" ALTER COLUMN "variables" SET DEFAULT '[]'::json;--> statement-breakpoint
ALTER TABLE "flows" DROP COLUMN IF EXISTS "diagrams";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intents" ADD CONSTRAINT "intents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
