CREATE TABLE IF NOT EXISTS "chatbox_settings" (
	"logo_url" text,
	"name" text,
	"color" text DEFAULT '#2563eb',
	"button_size" integer DEFAULT 40,
	"position" json,
	"window_size" json DEFAULT '{"width":320,"height":500}'::json,
	"channel_id" varchar NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chatbox_settings" ADD CONSTRAINT "chatbox_settings_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
