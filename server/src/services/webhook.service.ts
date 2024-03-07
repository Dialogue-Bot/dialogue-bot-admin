import { LineChannel } from "@/channels/line.channel";
import { MessengerChannel } from "@/channels/messenger.channel";
import { LOCALE_KEY } from "@/constants";
import { HttpException } from "@/exceptions/http-exception";
import { LocaleService } from "@/i18n/ctx";
import { logger } from "@/utils/logger";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Inject, Service } from "typedi";
import { ChannelService } from "./channels.service";

@Service()
export class WebhookService {
    constructor(
        @Inject(LOCALE_KEY) private readonly localeService: LocaleService,
        private readonly chanelService: ChannelService
    ) { }

    public async verifyWebhook(contactId: string, req: Request, res: Response) {
        const expectedChannel = await this.chanelService.findOneByContactId(contactId);

        if (!expectedChannel) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                this.localeService.i18n().CHANNEL.NOT_FOUND()
            );
        }

        let verifyResult = null;

        const { id, contactName, channelType, credentials } = expectedChannel;
        switch (channelType) {
            case 'MSG':
                const messengerChannel = new MessengerChannel(id, contactId, contactName, channelType, credentials);
                verifyResult = messengerChannel.verifyWebhook(req, res);
                break;
            default:
                break;
        }

        if (!verifyResult) {
            throw new HttpException(StatusCodes.FORBIDDEN, null);
        }

        return verifyResult;
    }

    public async handleIncomingMessage(contactId: string, req: Request, res: Response) {
        const expectedChannel = await this.chanelService.findOneByContactId(contactId);

        if (!expectedChannel) {
            logger.info('[Incoming message] Can not find channel with id ', req.params.id);
            return;
        }

        const { id, contactName, channelType, credentials } = expectedChannel;

        let prepareMessage = null;

        switch (channelType) {
            case 'MSG':
                const messengerChannel = new MessengerChannel(id, contactId, contactName, channelType, credentials);
                prepareMessage = await messengerChannel.prepareMessage(req, res);
                break;
            case 'LIN':
                const lineChannel = new LineChannel(id, contactId, contactName, channelType, credentials);
                prepareMessage = await lineChannel.prepareMessage(req, res);
                break;
            default:
                logger.info(`[Incoming message] Does not support channel type ${channelType}`);
                break;
        }

        return prepareMessage;
    }
}