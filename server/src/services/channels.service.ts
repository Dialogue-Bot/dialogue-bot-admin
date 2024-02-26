import { MessengerChannel } from "@/channels/messenger.channel";
import { LOCALE_KEY } from "@/constants";
import { db } from "@/database/db";
import { channelTypes, channels } from "@/database/schema";
import { TNewChannel, TUpdateChannel } from "@/database/types";
import { PagingDTO } from "@/dtos/paging.dto";
import { HttpException } from "@/exceptions/http-exception";
import { LocaleService } from "@/i18n/ctx";
import { ChannelExtend, ChannelInfo, ChannelType } from "@/interfaces/channels.interface";
import { Paging } from "@/interfaces/paging.interface";
import { and, asc, desc, eq, like, sql } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { Inject, Service } from "typedi";


@Service()
export class ChannelService {
    channelTypes: ChannelType[] = [];
    channels: ChannelInfo[] = [];
    constructor(
        @Inject(LOCALE_KEY) private readonly localeService: LocaleService
    ) {
        this.initChannels();
        this.getAllChannelTypes();
    }

    public async create(fields: TNewChannel) {
        const channelExisted = await db.query.channels.findFirst({
            where: and(
                eq(channels.contactId, fields.contactId),
                eq(channels.userId, fields.userId)
            ),
        });

        if (channelExisted) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                this.localeService.i18n().CHANNEL.CONTACTID_EXISTED()
            );
        }
        fields.credentials = fields.credentials && JSON.stringify(fields.credentials) || null;

        const [newChannel] = await db.insert(channels).values(fields).returning();

        if (!newChannel) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                this.localeService.i18n().CHANNEL.CREATE_FAILED()
            );
        }

        const { id, contactId, contactName, channelTypeId, credentials } = newChannel;

        const channelType = this.channelTypes.find(ct => ct.id == channelTypeId).name;

        this.initChannel({ id, contactId, contactName, channelType, credentials })

        return newChannel;
    }

    public async findOneById(id: string) {
        const channel = await db.query.channels.findFirst({
            where: eq(channels.id, id),
        });

        return channel;
    }

    public async updateById(id: string, fields: TUpdateChannel) {
        const channelExisted = await db.query.channels.findFirst({
            where: eq(channels.id, id),
        })

        if (!channelExisted) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                this.localeService.i18n().CHANNEL.NOT_FOUND()
            );
        }

        const contactIdExisted = await db.query.channels.findFirst({
            where: eq(channels.contactId, fields.contactId),
        });

        if (contactIdExisted && fields.contactId !== channelExisted.contactId) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                this.localeService.i18n().CHANNEL.CONTACTID_EXISTED()
            );
        }

        fields.updatedAt = new Date();

        const [updateChannel] = await db
            .update(channels)
            .set(fields)
            .where(eq(channels.id, id))
            .returning();

        if (!updateChannel) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                this.localeService.i18n().CHANNEL.UPDATE_FAILED()
            );
        }

        const { contactId, contactName, channelTypeId, credentials } = updateChannel;

        const channelType = this.channelTypes.find(ct => ct.id == channelTypeId).name;

        this.initChannel({ id, contactId, contactName, channelType, credentials })

        return updateChannel;
    }

    public async deleteById(id: string, userId: string) {
        const channelExisted = await db.query.channels.findFirst({
            where: and(
                eq(channels.id, id),
                eq(channels.userId, userId)
            ),
        })

        if (!channelExisted) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                this.localeService.i18n().CHANNEL.NOT_FOUND()
            );
        }

        channelExisted.deleted = true;

        await db
            .update(channels)
            .set(channelExisted)
            .where(eq(channels.id, id));
    }

    public async deleteByIds(ids: string[], userId: string) {
        ids.forEach(async (id) => {
            const channelExisted = await db.query.channels.findFirst({
                where: and(
                    eq(channels.id, id),
                    eq(channels.userId, userId)
                ),
            })

            if (channelExisted) {
                channelExisted.deleted = true;
                await db
                    .update(channels)
                    .set(channelExisted)
                    .where(eq(channels.id, id));
            }
        });
    }

    public async getAllChannels(paging: PagingDTO, userId: string): Promise<Paging<ChannelExtend>> {
        const offset = paging.page && ((paging.page - 1) * paging.limit) || 0;
        const orderBy = paging.orderBy ?? 'contactId';

        const result: ChannelExtend[] = await db
            .select({
                id: channels.id,
                contactId: channels.contactId,
                contactName: channels.contactName,
                name: channels.contactName,
                channelType: channelTypes.description,
                credentials: channels.credentials,
                active: channels.active,
                createdAt: channels.createdAt,
                updateAt: channels.updatedAt,
            })
            .from(channels)
            .where(
                and(
                    like(channels.contactId, `%${paging.q}%`),
                    eq(channels.deleted, false),
                    eq(channels.userId, userId)
                )
            )
            .innerJoin(channelTypes, eq(channels.channelTypeId, channelTypes.id))
            .orderBy(paging.sortType === 'asc' ? asc(channels[orderBy]) : desc(channels[orderBy]))
            .offset(offset)
            .limit(paging.limit);

        const [count] = await db
            .select({ count: sql<number>`cast(count(${channels.id}) as integer)` })
            .from(channels)
            .where(eq(channels.deleted, false));

        return { items: result, totalItems: count.count };
    }

    initChannel(channel: ChannelInfo) {
        switch (channel.channelType) {
            case 'MSG':
                const { id, contactId, contactName, channelType, credentials } = channel;
                return new MessengerChannel(id, contactId, contactName, channelType, credentials);
            default:
                console.log(`Does not support channel type ${channel.channelType}`);
                break;
        }

        return channel;
    }

    async initChannels() {
        let contacts: ChannelInfo[] = await db
            .select({
                id: channels.id,
                contactId: channels.contactId,
                contactName: channels.contactName,
                channelType: channelTypes.name,
                credentials: channels.credentials,
            })
            .from(channels)
            .where(eq(channels.deleted, false))
            .innerJoin(channelTypes, eq(channels.channelTypeId, channelTypes.id))

        contacts.forEach((c) => {
            const channel = this.initChannel(c);
            if (channel) this.channels.push(channel);
        })
    }

    async getAllChannelTypes() {
        const getChannelTypes = await db.select().from(channelTypes).where(eq(channelTypes.deleted, false));
        if (channelTypes) this.channelTypes = getChannelTypes
    }
}