CREATE TABLE IF NOT EXISTS "flows" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"user_id" varchar(36) NOT NULL,
	"deleted" boolean DEFAULT false,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"diagrams" json DEFAULT '[]'::json,
	"edges" json DEFAULT '[]'::json,
	"nodes" json DEFAULT '[]'::json,
	"settings" json DEFAULT '[]'::json,
	"variables" json DEFAULT '{}'::json,
	"flows" json DEFAULT '[]'::json,
	"publish_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "channels" ADD COLUMN "flow_id" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "channels" ADD CONSTRAINT "channels_channel_type_id_channel_types_id_fk" FOREIGN KEY ("channel_type_id") REFERENCES "channel_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "channels" ADD CONSTRAINT "channels_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "channels" ADD CONSTRAINT "channels_flow_id_flows_id_fk" FOREIGN KEY ("flow_id") REFERENCES "flows"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flows" ADD CONSTRAINT "flows_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
