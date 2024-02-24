import { LOCALE_KEY } from "@/constants";
import { db } from "@/database/db";
import { channelTypes, channels } from "@/database/schema";
import { TNewChannel, TUpdateChannel } from "@/database/types";
import { PagingDTO } from "@/dtos/paging.dto";
import { HttpException } from "@/exceptions/http-exception";
import { LocaleService } from "@/i18n/ctx";
import { ChannelExtend } from "@/interfaces/channels.interface";
import { Paging } from "@/interfaces/paging.interface";
import { and, asc, desc, eq, like, sql } from "drizzle-orm";
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

    public async getChannelsPaging(paging: PagingDTO): Promise<Paging<any>> {
        const offset = paging.page && ((paging.page - 1) * paging.limit) || 0;
        // const [query, count] =
        //     await Promise.all([
        //         db
        //             .select({
        //                 id: channels.id,
        //                 contactId: channels.contactId,
        //                 name: channels.contactName,
        //                 channelType: channelTypes.description,
        //                 credentials: channels.credentials,
        //                 active: channels.active,
        //                 createdAt: channels.createdAt,
        //                 updateAt: channels.updatedAt,
        //             })
        //             .from(channels)
        //             .where(
        //                 and(
        //                     like(channels.contactId, `%${paging.q}%`),
        //                     eq(channels.deleted, false)
        //                 )
        //             )
        //             .innerJoin(channelTypes, eq(channels.channelTypeId, channelTypes.id))
        //             .orderBy(paging.sortType === 'asc' ? asc(channels[paging.orderBy]) : desc(channels[paging.orderBy]))
        //             .offset(offset)
        //             .limit(paging.limit),
        //         db
        //             .select({ count: sql<number>`cast(count(${channels.id}) as integer)` })
        //             .from(channels)
        //             .where(eq(channels.deleted, false)),
        //     ]);

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
}