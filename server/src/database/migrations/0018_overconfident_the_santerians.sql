ALTER TABLE "conversations" DROP CONSTRAINT "conversations_channel_id_channels_id_fk";
--> statement-breakpoint
ALTER TABLE "conversations" ALTER COLUMN "channel_id" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversations" ADD CONSTRAINT "conversations_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
