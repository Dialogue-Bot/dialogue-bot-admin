ALTER TABLE "messages" ADD COLUMN "message" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "template" json DEFAULT '{}'::json;--> statement-breakpoint
ALTER TABLE "messages" DROP COLUMN IF EXISTS "data";