import { LOCALE_KEY } from "@/constants";
import { db } from "@/database/db";
import { channelTypes, channels } from "@/database/schema";
import { TNewChannel, TUpdateChannel } from "@/database/types";
import { PagingDTO } from "@/dtos/paging.dto";
import { HttpException } from "@/exceptions/http-exception";
import { LocaleService } from "@/i18n/ctx";
import { ChannelExtend } from "@/interfaces/channels.interface";
import { Paging } from "@/interfaces/paging.interface";
import { Helper } from "@/utils/helper";
import { asc, desc, eq, isNotNull, like } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { Inject, Service } from "typedi";


@Service()
export class ChannelService {
    constructor(
        @Inject(LOCALE_KEY) private readonly localeService: LocaleService
    ) { }

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

        const channel = await db.insert(channels).values(fields).returning();
        if (!channel[0]) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                this.localeService.i18n().CHANNEL.CREATE_FAILED()
            );
        }
        return channel[0];
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

    public async getChannelsPaging(paging: PagingDTO): Promise<Paging<ChannelExtend>> {
        const query = await db
            .select()
            .from(channels)
            .where(paging.q ? like(channels.contactId, `%${paging.q}%`) : isNotNull(channels.contactId))
            .innerJoin(channelTypes, eq(channels.channelTypeId, channelTypes.id))
            .orderBy(paging.sortType === 'asc' ? asc(channels[paging.orderBy]) : desc(channels[paging.orderBy]))
            .offset(paging.page * paging.limit)
            .limit(paging.limit);

        const data: ChannelExtend[] = query.map((rs: any) => ({
            id: rs.channels?.id,
            contactId: rs.channels?.contactId,
            contactName: rs.channels?.contactName,
            channelType: rs.channel_types?.description,
            credentials: rs.channels?.credentials ?? null,
            active: rs.channels?.active,
            createdAt: Helper.formatDate(rs.channels?.createdAt),
            updateAt: Helper.formatDate(rs.channels?.updateAt),
        }));

        return { items: data, totalItems: data.length };
    }
}