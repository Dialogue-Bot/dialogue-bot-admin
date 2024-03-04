import { PUBLIC_DOMAIN } from "@/config";
import axios from "axios";
import { Request, Response } from "express";
import { BaseChannel } from "./base.channel";

export class LineChannel extends BaseChannel {
    pageToken: string;
    linePostURL: string;
    credentials: string;

    constructor(id: string, contactId: string, contactName: string, channelType: string, credentials: string) {
        super(id, contactId, contactName, channelType);

        let parseCredentials: LineChannel;

        this.credentials = credentials;

        if (credentials && typeof credentials == 'string') parseCredentials = JSON.parse(credentials);

        if (parseCredentials) {
            this.pageToken = parseCredentials.pageToken;
        }

        this.channelType = channelType;
        this.linePostURL = `https://api.line.me/v2/bot`;
    }

    public async registerWebhook() {
        try {
            await axios({
                method: 'PUT',
                url: this.linePostURL + '/channel/webhook/endpoint',
                data: { endpoint: PUBLIC_DOMAIN + '/webhook/' + this.contactId },
                headers: {
                    Authorization: `Bearer ${this.pageToken}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log(`[LIN] Registered webhook for ${this.channelType} - ${this.contactName} ${this.contactId}`);
        } catch (e) {
            console.log(`[LIN] Can not register webhook for ${this.channelType} - ${this.contactName} ${this.contactId}`);

        }
    }

    async getLineUserID() {
        try {
            const { data } = await axios({
                method: 'GET',
                url: this.linePostURL + '/info',
                headers: {
                    Authorization: `Bearer ${this.pageToken}`,
                },
            });
            if (!data || !data.userId) throw new Error();

            return data.userId;
        } catch (e) {
            console.log(`[LIN] Can not get user ID for ${this.channelType} - ${this.contactName} ${this.contactId}`);
        }
    }

    async prepareMessage(req: Request, res: Response) {
        try {
            const { destination, events } = req.body;

            if (!(events && events[0] && events[0].type == 'message')) return;

            const lineUserId = await this.getLineUserID();

            if (destination == lineUserId) {
                const { message, source } = events[0];

                await this.postMessageToBot({ userId: source.userId, message: message.text, data: null });

                console.log(`[LIN] Sent message: ${message.text} from ${lineUserId} to Bot`);
            }
        } catch (e) {
            console.log(`[LIN] ${this.contactId} Can not send message to Bot - ${e.message}`);
        }
    }

    public async sendMessageToUser({ userId, text }) {
        const lineUserId = await this.getLineUserID();
        try {
            if (!text) return;

            await axios({
                method: 'POST',
                url: this.linePostURL + '/message/push',
                data: {
                    to: userId,
                    messages: [{ type: 'text', text }],
                },
                headers: {
                    Authorization: 'Bearer ' + this.pageToken,
                },
            })
        } catch (e) {
            console.log(`[LIN] Send message to User ${lineUserId} failed`);
        }
    }
}