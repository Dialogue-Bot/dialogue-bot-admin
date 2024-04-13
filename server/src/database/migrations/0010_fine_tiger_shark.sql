ALTER TABLE "conversations" ADD COLUMN "channel_id" text;--> statement-breakpoint
ALTER TABLE "conversations" ADD COLUMN "id" varchar(36) DEFAULT 'xr9chlw9p0c1mts5zp0ht9fg' NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversations" ADD CONSTRAINT "conversations_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
