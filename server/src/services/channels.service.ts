import { db } from "@/database/db";
import { channels } from "@/database/schema";
import { TNewChannel, TUpdateChannel } from "@/database/types";
import { tryCatch } from "bullmq";
import { eq } from "drizzle-orm";
import { Service } from "typedi";

@Service()
export class ChannelService {
    public async create(fields: TNewChannel) {
        try {
            console.log("start create channel")
            console.log(fields);
            fields.contactId = fields.contactId && fields.contactId.trim() || null;
            const channel = await db.insert(channels).values(fields).returning;
            console.log(channel[0]);

            return channel[0];
        }
        catch (error) {
            console.log(error);
        }
    }

    public async findOneById(id: number) {
        const channel = await db.query.channels.findFirst({
            where: eq(channels.id, id),
        });

        return channel;
    }

    public async updateById(id: number, fields: TUpdateChannel) {
        const channel = await db
            .update(channels)
            .set(fields)
            .where(eq(channels.id, id))
            .returning();

        return channel[0];
    }
}