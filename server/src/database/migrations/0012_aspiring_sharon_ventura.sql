ALTER TABLE "messages" DROP CONSTRAINT "messages_conversation_id_conversations_user_id_fk";
--> statement-breakpoint
ALTER TABLE "conversations" ALTER COLUMN "id" SET DEFAULT 'fjcrx88jmtr9jh59nhupcmnk';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
