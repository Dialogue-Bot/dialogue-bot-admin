import { BOT_ENDPOINT, PUBLIC_DOMAIN } from "@/config";
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

    public async postMessageToBot({ userId, message = '', data }) {
        const uid = this.initConversationId(userId);
        try {
            const postMsg = await axios({
                method: 'POST',
                url: BOT_ENDPOINT,
                data: {
                    conversation: {
                        id: uid,
                    },
                    from: {
                        id: userId,
                    },
                    recipient: {
                        id: this.contactId,
                    },
                    data: data || false,
                    text: message,
                    type: 'message',
                    id: uid,
                    channelId: this.channelType,
                    serviceUrl: PUBLIC_DOMAIN,
                },
            })
            if (postMsg.data.success) {
                console.log(
                    `[${this.channelType} - ${this.contactName} ${this.contactId}] - [Conversation ID: ${uid}] - [Send message to bot - Message: ${message}] - [Data: ${data}]`
                )
            }
        } catch (error) {
            console.log(
                `[${this.channelType} - ${this.contactName} ${this.contactId}] - [Conversation ID: ${uid}] - [Can not send message to bot - Message: ${message}] - [Error: ${error.message}]`
            );
        }
    }

    initConversationId(userId: string) {
        return this.contactId + '-' + userId
    }
}