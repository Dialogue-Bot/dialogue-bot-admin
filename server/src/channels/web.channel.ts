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

    public async sendMessageToUser({ userId, text, type, channelData }: {
        type?: string;
        userId: string;
        text: string;
        channelData: any;
    }) {
        try {
            let result = { userId, messages: text || '', template: {} };

            if (channelData) {
                result.template = {
                    data: channelData.extendData,
                    type: channelData.type,
                }
            }
            console.log('result: ' + JSON.stringify(result));
            if (App.io) {
                App.io.to(userId).emit(type || SOCKET_EVENTS.MESSAGE, result);
            }
        } catch (e) {
            logger.info(
                `[WEB] Bot send message to User failed - Error: ${e.message}`,
            )
        }
    }

    // async detectTemplate(channelData: any) {
    //     let result = null;
    //     if (!channelData) return result;

    //     switch (channelData.type) {
    //         case 'list-button':
    //             result = {
    //                 data: channelData.extendData,
    //                 type: channelData.type,
    //             }
    //             break;
    //         case 'list-card':
    //             result = {
    //                 data: channelData.extendData,
    //                 type: channelData.type,
    //             }
    //             break;
    //         default:
    //             logger.info(
    //                 `[WEB] channel web does not support type ${channelData.type}`,
    //             )
    //             break;
    //     }
    //     return result;
    // }
}
