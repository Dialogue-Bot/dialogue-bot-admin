import { LOCALE_KEY } from '@/constants'
import { db } from '@/database/db'
import { channels, flows } from '@/database/schema'
import { TNewFlow } from '@/database/types'
import { FlowDTO } from '@/dtos/flows.dto'
import { PagingDTO } from '@/dtos/paging.dto'
import { HttpException } from '@/exceptions/http-exception'
import { LocaleService } from '@/i18n/ctx'
import { FlowExtend } from '@/interfaces/flows.interface'
import { Paging } from '@/interfaces/paging.interface'
import { logger } from '@/utils/logger'
import { and, asc, desc, eq, isNotNull, like, ne, sql } from 'drizzle-orm'
import { StatusCodes } from 'http-status-codes'
import { omit } from 'lodash'
import { Inject, Service } from 'typedi'
import { ChannelService } from './channels.service'

@Service()
export class FlowService {
  constructor(
    @Inject(LOCALE_KEY) private readonly localeService: LocaleService,
    private readonly chanelService: ChannelService,
  ) {}

  public async create(fields: TNewFlow) {
    const flowExisted = await db.query.flows.findFirst({
      where: and(
        eq(flows.name, fields.name),
        eq(flows.userId, fields.userId),
        eq(flows.deleted, false),
      ),
    })

    if (flowExisted) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().FLOW.FLOW_NAME_EXISTED(),
      )
    }

    const [newFlow] = await db
      .insert(flows)
      .values({
        ...fields,
        settings: [
          {
            type: 'language',
            value: 'en',
            default: true,
            label: 'Language',
          },
        ],
      })
      .returning()

    if (!newFlow) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().FLOW.CREATE_FAILED(),
      )
    }

    return newFlow
  }

  public async updateFlowById({
    fields,
    id,
    userId,
  }: {
    userId: string
    id: string
    fields: FlowDTO
  }) {
    const flowExisted = await db.query.flows.findFirst({
      where: eq(flows.id, id),
    })

    if (!flowExisted) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().FLOW.NOT_FOUND(),
      )
    }

    const flowNameExisted = await db.query.flows.findFirst({
      where: and(
        ne(flows.id, id),
        eq(flows.name, fields.name),
        eq(flows.userId, userId),
        eq(flows.deleted, false),
      ),
    })

    if (flowNameExisted) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().FLOW.FLOW_NAME_EXISTED(),
      )
    }

    await this.chanelService.updateFlowId(fields.channelIds, flowExisted.id)

    const [updateFlow] = await db
      .update(flows)
      .set({
        ...omit(fields, ['channelIds']),
        updatedAt: new Date(),
      })
      .where(eq(flows.id, id))
      .returning()

    if (!updateFlow) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().FLOW.UPDATE_FAILED(),
      )
    }

    return updateFlow
  }

  public async deleteById(id: string, userId: string) {
    const flowExisted = await db.query.flows.findFirst({
      where: and(eq(flows.id, id), eq(flows.userId, userId)),
    })

    if (!flowExisted) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().FLOW.NOT_FOUND(),
      )
    }

    flowExisted.deleted = true

    await db.update(flows).set(flowExisted).where(eq(flows.id, id))
  }

  public async publishFlow(id: string, userId: string) {
    const flowExisted = await db.query.flows.findFirst({
      where: and(eq(flows.id, id), eq(flows.userId, userId)),
    })

    if (!flowExisted) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().FLOW.NOT_FOUND(),
      )
    }

    flowExisted.publishAt = new Date()

    await db.update(flows).set(flowExisted).where(eq(flows.id, id))
  }

  public async getFlowById(id: string, userId: string) {
    const flowExisted = await db.query.flows.findFirst({
      where: and(eq(flows.id, id), eq(flows.userId, userId)),
    })

    if (!flowExisted) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().FLOW.NOT_FOUND(),
      )
    }

    return flowExisted
  }

  public async getAllFlows(
    paging: PagingDTO,
    userId: string,
  ): Promise<Paging<FlowExtend>> {
    const offset = (paging.page && (paging.page - 1) * paging.limit) || 0
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
          eq(flows.userId, userId),
        ),
      )
      .orderBy(this.makeOrderBy(paging.sortType, 'name', paging.orderBy))
      .offset(offset)
      .limit(paging.limit)
    const [{ count }] = await db
      .select({ count: sql<number>`cast(count(${flows.id}) as integer)` })
      .from(flows)
      .where(
        and(
          like(flows.name, `%${paging.q || ''}%`),
          eq(flows.deleted, false),
          eq(flows.userId, userId),
        ),
      )

    return { items: result, totalItems: count }
  }

  private makeOrderBy(sortType: string, defaultOrderBy: string, key?: string) {
    let orderBy =
      sortType === 'asc'
        ? asc(flows[key || defaultOrderBy])
        : desc(flows[key || defaultOrderBy])
    return orderBy
  }

  public async addMultipleChannels(
    channelIDs: string[],
    flowId: string,
    userId: string,
  ) {
    const flowExisted = await db.query.flows.findFirst({
      where: and(eq(flows.id, flowId), eq(flows.userId, userId)),
    })

    if (!flowExisted) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().FLOW.NOT_FOUND(),
      )
    }

    const result = await this.chanelService.updateFlowId(
      channelIDs,
      flowExisted.id,
    )

    if (!result) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().FLOW.ADD_MULTIPLE_CHANNELS_FLOW__FAILED(),
      )
    }

    return result
  }

  public async getFlowsForSelect(userId: string) {
    logger.info('[FlowService] trying to get flows for select')

    const result = await db
      .select({
        label: flows.name,
        value: flows.id,
      })
      .from(flows)
      .where(and(eq(flows.deleted, false), eq(flows.userId, userId)))
      .orderBy(asc(flows.name))

    logger.info(`[FlowService] result: ${JSON.stringify(result)}`)

    return result
  }
  public async getFlowByContactId(contactId: string) {
    const flow = db.query.flows.findFirst({
      where: and(
        eq(flows.deleted, false),
        isNotNull(flows.publishAt),
        isNotNull(
          db
            .select({
              id: channels.id,
            })
            .from(channels)
            .where(and(eq(channels.contactId, contactId))),
        ),
      ),
    })

    if (!flow) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().FLOW.NOT_FOUND(),
      )
    }
    return flow
  }
}
