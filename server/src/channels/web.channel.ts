import { SOCKET_EVENTS } from '@/constants'
import { logger } from '@/utils/logger'
import { Request, Response } from 'express'
import { App } from '../app'
import { BaseChannel } from './base.channel'

export class WebChannel extends BaseChannel {
    credentials: string

    constructor(
        id: string,
        contactId: string,
        contactName: string,
        channelType: string,
        credentials: string,
    ) {
        super(id, contactId, contactName, channelType)
        this.channelType = channelType;
        this.credentials = credentials;
    }

    async prepareMessage(req: Request, res: Response) { }

    public async sendMessageToUser({ userId, text, type }: {
        type?: string;
        userId: string;
        text: string;
    }) {
        try {
            if (App.io) {

                App.io.to(userId).emit(
                    type || SOCKET_EVENTS.MESSAGE,
                    { userId, message: text });
            }
        } catch (e) {
            logger.info(
                `[WEB] Bot send message to User failed - Error: ${e.message}`,
            )
        }
    }
}
