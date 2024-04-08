CREATE TABLE IF NOT EXISTS "conversations" (
	"user_id" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_id" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"conversation_id" varchar(36) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"from" text NOT NULL,
	"to" text NOT NULL,
	"type" text DEFAULT 'text' NOT NULL,
	"data" json DEFAULT '{"text":""}'::json
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_conversations_user_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
