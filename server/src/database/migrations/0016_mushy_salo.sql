ALTER TABLE "conversations" ADD PRIMARY KEY ("user_id");--> statement-breakpoint
ALTER TABLE "conversations" ALTER COLUMN "ended_at" SET DEFAULT now();