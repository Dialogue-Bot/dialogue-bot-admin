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
            return null;
        }
    }

    public async prepareMessage(req: Request, res: Response) {

    }
}