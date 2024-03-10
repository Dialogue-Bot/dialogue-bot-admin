ALTER TABLE "flows" ALTER COLUMN "variables" SET DEFAULT '[]'::json;--> statement-breakpoint
ALTER TABLE "flows" DROP COLUMN IF EXISTS "diagrams";