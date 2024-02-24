ALTER TABLE "channel_types" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "channels" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "channels" ALTER COLUMN "credentials" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "channels" ALTER COLUMN "active" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "channels" ALTER COLUMN "channel_type_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "channel_types" ADD COLUMN "deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "channels" ADD COLUMN "deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "channels" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "channels" DROP COLUMN IF EXISTS "update_at";