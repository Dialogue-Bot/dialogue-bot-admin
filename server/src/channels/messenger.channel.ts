import { Helper } from "@/utils/helper";
import { Request, Response } from "express";
import { BaseChannel } from "./base.channel";

export class MessengerChannel extends BaseChannel {
    pageToken: string;
    webhookSecret: string;
    messengerPostURL: string;
    credentials: string;

    constructor(id: string, contactId: string, contactName: string, channelType: string, credentials: string) {
        super(id, contactId, contactName, channelType);

        let parseCredentials: MessengerChannel;

        this.credentials = credentials;

        if (credentials && typeof credentials == 'string') parseCredentials = JSON.parse(credentials);

        if (parseCredentials) {
            this.pageToken = parseCredentials.pageToken;
            this.webhookSecret = parseCredentials.webhookSecret;
        }

        this.channelType = channelType;
        this.messengerPostURL = `https://graph.facebook.com/v18.0/me/messages?access_token=`;
    }

    public verifyWebhook(req: Request, res: Response) {
        let mode = req.query['hub.mode'];
        let token = req.query['hub.verify_token'];
        let challenge = req.query['hub.challenge'];

        if (mode === 'subscribe' && this.webhookSecret == token) {
            console.log(`channel ${this.channelType} - ${this.contactName} ${this.contactId} webhook verified!`);
            return challenge;
        } else {
            console.error(`Verification channel ${this.channelType} - ${this.contactName} ${this.contactId} failed!`);
            return;
        }
    }

    public async prepareMessage(req: Request, res: Response) {
        const { object, entry } = req.body;

        if (object != 'page' || !Array.isArray(entry)) return;

        entry.forEach(pageEntry => {
            if (!Array.isArray(pageEntry.messaging)) return;

            pageEntry.messaging.forEach(async (messagingEvent) => {
                if (messagingEvent.messaging_customer_information)
                    return this.sendAddressToBot({
                        userId: messagingEvent.sender.id,
                        address: messagingEvent.messaging_customer_information.screens[0].responses,
                    });

                if (!messagingEvent.message && !messagingEvent.postback) return;

                const senderId = messagingEvent.sender.id;
                const messageText = messagingEvent.message && messagingEvent.message.text;
                const payload = messagingEvent.postback && messagingEvent.postback.payload;
                const quick_reply = messagingEvent.message && messagingEvent.message.quick_reply;

                if (senderId == this.contactId) return; //Agent replied to user => skip

                return this.postMessageToBot({ userId: senderId, message: messageText || payload, data: null });
            });
        });
    }

    sendAddressToBot({ userId, address }) {
        return this.postMessageToBot({ userId, message: 'ADDRESS', data: { USER_INFORMATION: Helper.arrayToObj(address) } });
    }
}