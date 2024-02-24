DO $$ BEGIN
 CREATE TYPE "roles" AS ENUM('ADMIN', 'USER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "channel_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	CONSTRAINT "channel_types_name_unique" UNIQUE("name"),
	CONSTRAINT "channel_types_description_unique" UNIQUE("description")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "channels" (
	"id" serial PRIMARY KEY NOT NULL,
	"contact_id" text NOT NULL,
	"contact_name" text NOT NULL,
	"credentials" json,
	"active" boolean DEFAULT true,
	"channel_type_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"update_at" timestamp DEFAULT now(),
	CONSTRAINT "channels_contact_id_unique" UNIQUE("contact_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text,
	"name" text NOT NULL,
	"avatar" text,
	"role" roles[] NOT NULL,
	"provider" text DEFAULT 'local' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "users" ("email");