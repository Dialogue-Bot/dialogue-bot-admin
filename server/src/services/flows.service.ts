import { LOCALE_KEY } from '@/constants';
import { db } from '@/database/db';
import { channels, flows } from '@/database/schema';
import { TNewFlow, TUpdateFlow } from '@/database/types';
import { PagingDTO } from '@/dtos/paging.dto';
import { HttpException } from '@/exceptions/http-exception';
import { LocaleService } from '@/i18n/ctx';
import { FlowExtend } from '@/interfaces/flows.interface';
import { Paging } from '@/interfaces/paging.interface';
import { and, asc, desc, eq, like, ne, notExists, sql } from 'drizzle-orm';
import { StatusCodes } from 'http-status-codes';
import { Inject, Service } from 'typedi';
import { ChannelService } from './channels.service';


@Service()
export class FlowService {
    constructor(
        @Inject(LOCALE_KEY) private readonly localeService: LocaleService,
        private readonly chanelService: ChannelService
    ) { }

    public async create(fields: TNewFlow) {
        const flowExisted = await db.query.flows.findFirst({
            where: and(
                eq(flows.name, fields.name),
                eq(flows.userId, fields.userId),
                eq(flows.deleted, false)
            ),
        });

        if (flowExisted) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                this.localeService.i18n().FLOW.FLOW_NAME_EXISTED()
            );
        }

        const [newFlow] = await db.insert(flows).values(fields).returning();

        if (!newFlow) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                this.localeService.i18n().FLOW.CREATE_FAILED()
            );
        }

        return newFlow;
    }

    public async updateFlowById(id: string, fields: TUpdateFlow) {
        const flowExisted = await db.query.flows.findFirst({
            where: eq(flows.id, id),
        });

        if (!flowExisted) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                this.localeService.i18n().FLOW.NOT_FOUND()
            );
        }

        const flowNameExisted = await db.query.flows.findFirst({
            where: and(
                ne(flows.id, id),
                eq(flows.name, fields.name),
                eq(flows.userId, fields.userId),
                eq(flows.deleted, false)
            ),
        });

        if (flowNameExisted) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                this.localeService.i18n().FLOW.FLOW_NAME_EXISTED()
            );
        }

        fields.updatedAt = new Date();

        const [updateFlow] = await db
            .update(flows)
            .set(fields)
            .where(eq(flows.id, id))
            .returning();

        if (!updateFlow) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                this.localeService.i18n().FLOW.UPDATE_FAILED()
            );
        }

        return updateFlow;
    }

    public async deleteById(id: string, userId: string) {
        const flowExisted = await db.query.flows.findFirst({
            where: and(
                eq(flows.id, id),
                eq(flows.userId, userId)
            ),
        });

        if (!flowExisted) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                this.localeService.i18n().FLOW.NOT_FOUND()
            );
        }

        flowExisted.deleted = true;

        await db.update(flows).set(flowExisted).where(eq(flows.id, id));
    }

    public async publishFlow(id: string, userId: string) {
        const flowExisted = await db.query.flows.findFirst({
            where: and(
                eq(flows.id, id),
                eq(flows.userId, userId)
            ),
        });

        if (!flowExisted) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                this.localeService.i18n().FLOW.NOT_FOUND()
            );
        }

        flowExisted.publishAt = new Date();

        await db.update(flows).set(flowExisted).where(eq(flows.id, id));
    }

    public async getFlowById(id: string, userId: string) {
        const flowExisted = await db.query.flows.findFirst({
            where: and(
                eq(flows.id, id),
                eq(flows.userId, userId)
            ),
        });

        if (!flowExisted) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                this.localeService.i18n().FLOW.NOT_FOUND()
            );
        }

        return flowExisted;
    }

    public async getFlowByContactId(contactId: string) {

    }

    public async getAllFlows(paging: PagingDTO,
        userId: string
    ): Promise<Paging<FlowExtend>> {
        const offset = (paging.page && (paging.page - 1) * paging.limit) || 0;
        const result: FlowExtend[] = await db
            .select({
                id: flows.id,
                name: flows.name,
                publishAt: flows.publishAt,
            })
            .from(flows)
            .where(
                and(
                    like(flows.name, `%${paging.q || ''}%`),
                    eq(flows.deleted, false),
                    eq(flows.userId, userId)
                )
            )
            .orderBy(
                this.makeOrderBy(paging.sortType, 'name', paging.orderBy)
            )
            .offset(offset)
            .limit(paging.limit);
        const [count] = await db
            .select({ count: sql<number>`cast(count(${flows.id}) as integer)` })
            .from(flows)
            .where(
                and(
                    like(flows.name, `%${paging.q || ''}%`),
                    eq(flows.deleted, false),
                    eq(flows.userId, userId)
                )
            );

        return { items: result, totalItems: count.count };
    }

    private makeOrderBy(sortType: string, defaultOrderBy: string, key?: string) {
        let orderBy =
            sortType === 'asc'
                ? asc(flows[key || defaultOrderBy])
                : desc(flows[key || defaultOrderBy]);
        return orderBy;
    }


    public async addMultipleChannels(channelIDs: string[], flowId: string, userId: string) {
        const flowExisted = await db.query.flows.findFirst({
            where: and(
                eq(flows.id, flowId),
                eq(flows.userId, userId)
            ),
        });

        if (!flowExisted) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                this.localeService.i18n().FLOW.NOT_FOUND()
            );
        }

        const result = await this.chanelService.updateFlowId(channelIDs, flowExisted.id)

        if (!result) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                this.localeService.i18n().FLOW.ADD_MULTIPLE_CHANNELS_FLOW__FAILED()
            );
        }

        return result;
    }

    public async selectFlowsForChannel(userId: string) {
        const result = await db
            .select({
                name: flows.name
            })
            .from(flows)
            .where(
                and(
                    eq(flows.deleted, false),
                    eq(flows.userId, userId),
                    notExists(
                        db.select({
                            flowId: channels.flowId
                        })
                            .from(channels)
                            .where(eq(channels.flowId, flows.id))
                    )
                )
            );

        return result;
    }
}
