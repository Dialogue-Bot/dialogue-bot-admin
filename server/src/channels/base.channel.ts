import { BOT_URL } from "@/config";
import axios from "axios";

export class BaseChannel {
    id: string;
    contactId: string;
    contactName: string;
    channelType: string;

    constructor(id: string, contactId: string, contactName: string, channelType: string) {
        this.id = id;
        this.contactId = contactId;
        this.contactName = contactName;
        this.channelType = channelType;
    }

    public async postMessageToBot({ userId, data }) {
        try {
            const uId = this.initConversationId(userId);
            await axios({
                method: 'POST',
                url: BOT_URL,
                data: {
                    conversation: {
                        id: uId,
                    },
                    from: {
                        id: userId,
                    },
                    recipient: {
                        id: this.contactId,
                    },
                    type: 'event',
                    name: 'payload',
                    data,
                    id: uId,
                    channelId: this.channelType,
                    serviceUrl: 'http://localhost:3000/api',
                },
            })
        } catch (error) {
            console.log(`Can not send data to bot!`, userId);
            console.log(error.message);
        }
    }

    initConversationId(useId: string) {
        return this.contactId + '-' + useId
    }

    // public async verifyWebhook(req: Request, res: Response) {
    // };
}