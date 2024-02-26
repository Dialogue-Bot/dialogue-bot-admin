import { MessengerChannel } from "@/channels/messenger.channel";
import { LOCALE_KEY } from "@/constants";
import { db } from "@/database/db";
import { channelTypes, channels } from "@/database/schema";
import { HttpException } from "@/exceptions/http-exception";
import { LocaleService } from "@/i18n/ctx";
import { and, eq } from "drizzle-orm";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Inject, Service } from "typedi";

@Service()
export class WebhookService {
    constructor(
        @Inject(LOCALE_KEY) private readonly localeService: LocaleService
    ) { }

    public async verifyWebhook(contactId: string, req: Request, res: Response) {
        const expectedChannel = await db.select({
            id: channels.id,
            contactId: channels.contactId,
            contactName: channels.contactName,
            channelType: channelTypes.name,
            credentials: channels.credentials,
        })
            .from(channels)
            .where(
                and(eq(channels.contactId, contactId),
                    eq(channels.deleted, false)
                )
            )
            .innerJoin(channelTypes, eq(channels.channelTypeId, channelTypes.id));

        if (!expectedChannel) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                this.localeService.i18n().CHANNEL.NOT_FOUND()
            );
        }

        let verifyResult = null;

        if (expectedChannel[0]) {
            const { id, contactId, contactName, channelType, credentials } = expectedChannel[0];
            switch (expectedChannel[0].channelType) {
                case 'MSG':
                    const messengerChannel = new MessengerChannel(id, contactId, contactName, channelType, credentials);
                    verifyResult = messengerChannel.verifyWebhook(req, res);
                    break;
                default:
                    break;
            }
        }

        if (!verifyResult) {
            throw new HttpException(StatusCodes.FORBIDDEN, null);
        }

        return verifyResult;
    }
}