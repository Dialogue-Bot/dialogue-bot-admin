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
            where: eq(channels.contactId, fields.contactId),
        });

        if (channelExisted) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                this.localeService.i18n().CHANNEL.CONTACTID_EXISTED()
            );
        }
        fields.credentials = fields.credentials && JSON.stringify(fields.credentials) || null;

        const newChannel = await db.insert(channels).values(fields).returning();

        if (!newChannel[0]) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                this.localeService.i18n().CHANNEL.CREATE_FAILED()
            );
        }

        const { id, contactId, contactName, channelTypeId, credentials } = newChannel[0];

        const channelType = this.channelTypes.find(ct => ct.id == channelTypeId)[0].name;

        this.initChannel({ id, contactId, contactName, channelType, credentials })


        return newChannel[0];
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

        const channel = await db
            .update(channels)
            .set(fields)
            .where(eq(channels.id, id))
            .returning();

        if (!channel[0]) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                this.localeService.i18n().CHANNEL.UPDATE_FAILED()
            );
        }

        return channel[0];
    }

    public async deleteById(id: string) {
        const channelExisted = await db.query.channels.findFirst({
            where: eq(channels.id, id),
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

    public async deleteByIds(ids: string[]) {
        ids.forEach(async (id) => {
            const channelExisted = await db.query.channels.findFirst({
                where: eq(channels.id, id),
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

    public async getChannelsPaging(paging: PagingDTO): Promise<Paging<any>> {
        const offset = paging.page && ((paging.page - 1) * paging.limit) || 0;
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
                    eq(channels.deleted, false)
                )
            )
            .innerJoin(channelTypes, eq(channels.channelTypeId, channelTypes.id))
            .orderBy(paging.sortType === 'asc' ? asc(channels[paging.orderBy]) : desc(channels[paging.orderBy]))
            .offset(offset)
            .limit(paging.limit);

        const count = await db
            .select({ count: sql<number>`cast(count(${channels.id}) as integer)` })
            .from(channels)
            .where(eq(channels.deleted, false));

        return { items: result, totalItems: count[0].count };
    }

    public initChannel(channel: ChannelInfo) {
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

    public async initChannels() {
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

    async getChannelTypesById(id: string) {
        const channelType = await db.query.channelTypes.findFirst({
            where: and(eq(channelTypes.id, id), eq(channelTypes.deleted, false)),
        });
        if (!channelType) return null;
        return channelType;
    }
}