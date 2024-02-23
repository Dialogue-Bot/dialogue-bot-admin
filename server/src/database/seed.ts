import { db } from "./db";
import { channelTypes } from "./schema";

async function seedChannelTypes() {
    try {
        await db.insert(channelTypes).values([
            { name: 'MSG', description: 'Messenger' },
            { name: 'LIN', description: 'Line' },
            { name: 'WEB', description: 'Web' },
        ]);

        console.log('Channel types created');
    } catch (error) {
        console.error(`Can't create channel types`);
    }
}

seedChannelTypes();