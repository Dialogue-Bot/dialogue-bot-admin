ALTER TABLE "channels" DROP CONSTRAINT "channels_flow_id_flows_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "channels" ADD CONSTRAINT "channels_flow_id_flows_id_fk" FOREIGN KEY ("flow_id") REFERENCES "flows"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
