ALTER TABLE "chatbox_settings" DROP CONSTRAINT "chatbox_settings_channel_id_channels_id_fk";
--> statement-breakpoint
ALTER TABLE "chatbox_settings" ALTER COLUMN "position" SET DEFAULT '{"x":24,"y":24}'::json;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chatbox_settings" ADD CONSTRAINT "chatbox_settings_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
