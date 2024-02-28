CREATE TABLE IF NOT EXISTS "settings" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"email" json DEFAULT '{"email":"","password":""}'::json NOT NULL,
	"user_id" varchar(36) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "settings" ADD CONSTRAINT "settings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
