import { Creator } from '@/channels/creator.channel'
import { LOCALE_KEY, TEST_YOUR_BOT_CHANNEL } from '@/constants'
import { db } from '@/database/db'
import { channelTypes, channels, flows } from '@/database/schema'
import { TNewChannel, TUpdateChannel } from '@/database/types'
import {
  QueryChannelForSelectDto,
  UpdateChannelForTestDto,
} from '@/dtos/channels.dto'
import { PagingDTO } from '@/dtos/paging.dto'
import { HttpException } from '@/exceptions/http-exception'
import { LocaleService } from '@/i18n/ctx'
import {
  ChannelExtend,
  ChannelInfo,
  ChannelType,
} from '@/interfaces/channels.interface'
import { Paging } from '@/interfaces/paging.interface'
import { getTestBotContactId } from '@/utils/channel-helper'
import { logger } from '@/utils/logger'
import {
  and,
  asc,
  desc,
  eq,
  ilike,
  inArray,
  like,
  notIlike,
  sql,
} from 'drizzle-orm'
import { StatusCodes } from 'http-status-codes'
import { Inject, Service } from 'typedi'
import { UserSubscriptionService } from './user-subscription.service'
import { UserService } from './users.service'

@Service()
export class ChannelService {
  channelTypes: ChannelType[] = []
  channels: ChannelInfo[] = []

  @Inject((type) => UserSubscriptionService)
  private readonly userSubscriptionService: UserSubscriptionService

  @Inject((type) => UserService)
  private readonly userService: UserService

  constructor(
    @Inject(LOCALE_KEY) private readonly localeService: LocaleService,
  ) {
    this.initChannels()
    this.getAllChannelTypes()
  }

  public async create(fields: TNewChannel) {
    if (
      await this.userSubscriptionService.checkIsUsageExceed(fields.userId, {
        forChannel: true,
      })
    ) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().CHANNEL.EXCEED_MAX_CHANNELS(),
      )
    }

    const channelExisted = await db.query.channels.findFirst({
      where: and(
        eq(channels.contactId, fields.contactId),
        eq(channels.userId, fields.userId),
      ),
    })

    if (channelExisted) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().CHANNEL.CONTACTID_EXISTED(),
      )
    }
    fields.credentials =
      (fields.credentials && JSON.stringify(fields.credentials)) || null

    const [newChannel] = await db.insert(channels).values(fields).returning()

    if (!newChannel) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().CHANNEL.CREATE_FAILED(),
      )
    }

    const { id, contactId, contactName, channelTypeId, credentials } =
      newChannel

    const channelType = this.channelTypes.find(
      (ct) => ct.id == channelTypeId,
    ).name

    this.initChannel({
      id,
      contactId,
      contactName,
      channelType,
      credentials,
    })

    return newChannel
  }

  public async createDefaultChannel(userId: string, flowId: string) {
    const webChannelType = this.channelTypes.find((ct) => ct.name === 'WEB')

    return this.create({
      userId,
      contactId: getTestBotContactId(userId, flowId),
      contactName: getTestBotContactId(userId, flowId),
      channelTypeId: webChannelType.id,
      active: true,
      flowId,
    })
  }

  public async findOneByContactId(contactId: string) {
    const expectedChannel = await db
      .select({
        id: channels.id,
        contactId: channels.contactId,
        contactName: channels.contactName,
        channelType: channelTypes.name,
        credentials: channels.credentials,
        flowId: channels.flowId,
        userId: channels.userId,
      })
      .from(channels)
      .where(
        and(eq(channels.contactId, contactId), eq(channels.deleted, false)),
      )
      .innerJoin(channelTypes, eq(channels.channelTypeId, channelTypes.id))

    if (!expectedChannel) return null

    return expectedChannel[0]
  }

  public async updateById(id: string, fields: TUpdateChannel) {
    const channelExisted = await db.query.channels.findFirst({
      where: eq(channels.id, id),
    })

    if (!channelExisted) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().CHANNEL.NOT_FOUND(),
      )
    }

    const contactIdExisted = this.channels.find(
      (c) => c.contactId == fields.contactId,
    )

    if (contactIdExisted && fields.contactId !== channelExisted.contactId) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().CHANNEL.CONTACTID_EXISTED(),
      )
    }

    const [updateChannel] = await db
      .update(channels)
      .set({
        ...fields,
        updatedAt: new Date(),
      })
      .where(eq(channels.id, id))
      .returning()

    if (!updateChannel) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().CHANNEL.UPDATE_FAILED(),
      )
    }

    const { contactId, contactName, channelTypeId, credentials } = updateChannel

    const channelType = this.channelTypes.find(
      (ct) => ct.id == channelTypeId,
    ).name

    this.initChannel({
      id,
      contactId,
      contactName,
      channelType,
      credentials,
    })

    return updateChannel
  }

  public async deleteById(id: string, userId: string) {
    const channelExisted = await db.query.channels.findFirst({
      where: and(eq(channels.id, id), eq(channels.userId, userId)),
    })

    if (!channelExisted) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().CHANNEL.NOT_FOUND(),
      )
    }

    await db.delete(channels).where(eq(channels.id, id))
  }

  public async deleteByIds(ids: string[], userId: string) {
    await db
      .delete(channels)
      .where(and(inArray(channels.id, ids), eq(channels.userId, userId)))
  }

  public async getAllChannels(
    paging: PagingDTO,
    userId: string,
  ): Promise<Paging<ChannelExtend>> {
    const offset = (paging.page && (paging.page - 1) * paging.limit) || 0

    const where = and(
      like(channels.contactId, `%${paging.q || ''}%`),
      eq(channels.deleted, false),
      eq(channels.userId, userId),
      notIlike(channels.contactId, `%${TEST_YOUR_BOT_CHANNEL}%`),
    )

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
        updatedAt: channels.updatedAt,
        channelTypeId: channels.channelTypeId,
        flowId: channels.flowId,
      })
      .from(channels)
      .where(where)
      .innerJoin(channelTypes, eq(channels.channelTypeId, channelTypes.id))
      .orderBy(this.makeOrderBy(paging.sortType, 'contactId', paging.orderBy))
      .offset(offset)
      .limit(paging.limit)

    const [count] = await db
      .select({ count: sql<number>`cast(count(${channels.id}) as integer)` })
      .from(channels)
      .where(where)

    return { items: result, totalItems: count.count }
  }

  private makeOrderBy(sortType: string, defaultOrderBy: string, key?: string) {
    let orderBy =
      sortType === 'asc'
        ? asc(channels[key || defaultOrderBy])
        : desc(channels[key || defaultOrderBy])

    if (key === 'channelType') {
      orderBy =
        sortType === 'asc'
          ? asc(channelTypes.description)
          : desc(channelTypes.description)
    }

    return orderBy
  }

  initChannel(channel: ChannelInfo) {
    try {
      logger.info(
        `[Init channel] ${channel.channelType} - ${channel.contactName} ${channel.contactId}`,
      )
      return Creator.createChannel(channel)
    } catch (err) {
      logger.info(`[Init channel] ${err.message}`)
    }
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
      .where(and(eq(channels.deleted, false), eq(channels.active, true)))
      .innerJoin(channelTypes, eq(channels.channelTypeId, channelTypes.id))

    contacts.forEach((c) => {
      const channel = this.initChannel(c)
      if (channel) this.channels.push(channel)
    })
  }

  async getAllChannelTypes() {
    const getChannelTypes = await db
      .select()
      .from(channelTypes)
      .where(eq(channelTypes.deleted, false))
    if (channelTypes) this.channelTypes = getChannelTypes
  }

  async getChannelById(id: string) {
    const [expectedChannel] = await db
      .select({
        id: channels.id,
        contactId: channels.contactId,
        contactName: channels.contactName,
        channelType: channelTypes.name,
        credentials: channels.credentials,
        flowId: channels.flowId,
        userId: channels.userId,
      })
      .from(channels)
      .where(and(eq(channels.id, id), eq(channels.deleted, false)))
      .innerJoin(channelTypes, eq(channels.channelTypeId, channelTypes.id))

    if (!expectedChannel) return null

    return expectedChannel
  }

  async getTypes() {
    const types = await db
      .select({
        id: channelTypes.id,
        name: channelTypes.name,
        description: channelTypes.description,
      })
      .from(channelTypes)
      .where(eq(channelTypes.deleted, false))

    return types
  }

  async getTypeById(id: string) {
    const [type] = await db
      .select({
        id: channelTypes.id,
        name: channelTypes.name,
        description: channelTypes.description,
      })
      .from(channelTypes)
      .where(and(eq(channelTypes.id, id), eq(channelTypes.deleted, false)))

    return type
  }

  public async updateFlowId({
    flowId,
    ids,
    userId,
  }: {
    ids: string[]
    flowId: string
    userId: string
  }) {
    if (ids === undefined) return true

    const prevChannels = await db
      .select({
        id: channels.id,
      })
      .from(channels)
      .where(
        and(
          eq(channels.flowId, flowId),
          notIlike(channels.contactId, `%${TEST_YOUR_BOT_CHANNEL}%`),
        ),
      )
      .leftJoin(flows, eq(channels.flowId, flows.id))

    const prevChannelIds = prevChannels.map((c) => c.id)

    if (prevChannelIds.length) {
      await db
        .update(channels)
        .set({
          flowId: null,
          updatedAt: new Date(),
        })
        .where(inArray(channels.id, prevChannelIds))
    }

    if (ids.length) {
      await db
        .update(channels)
        .set({
          flowId,
          updatedAt: new Date(),
        })
        .where(inArray(channels.id, ids))
    }

    return true
  }

  public async getChannelsForSelect(
    userId: string,
    { flowId, isForConversation }: QueryChannelForSelectDto,
  ) {
    const _channels = await db
      .select({
        label: sql<string>`concat(${channelTypes.name}, ' - ', ${channels.contactName}, ' - ', ${channels.contactId})`,
        value: channels.id,
        isSelected: flowId
          ? sql<boolean>`
                case when ${channels.flowId} = ${flowId} then true else false end
            `
          : sql<boolean>`false`,
      })
      .from(channels)
      .innerJoin(channelTypes, eq(channels.channelTypeId, channelTypes.id))
      .where(
        and(
          eq(channels.userId, userId),
          eq(channels.deleted, false),
          notIlike(channels.contactId, `%${TEST_YOUR_BOT_CHANNEL}%`),
          isForConversation ? eq(channelTypes.name, 'WEB') : undefined,
        ),
      )

    return _channels
  }

  public async updateChannelForTest(
    userId: string,
    { flowId }: UpdateChannelForTestDto,
  ) {
    let channel = await this.getChannelForTest(userId, flowId)

    if (channel && channel.flowId === flowId) return channel

    if (!channel) {
      channel = await this.createDefaultChannel(userId, flowId)
    }

    const [updated] = await db
      .update(channels)
      .set({
        flowId: flowId ? flowId : null,
        updatedAt: new Date(),
      })
      .where(eq(channels.id, channel.id))
      .returning()

    return updated
  }

  public async getChannelForTest(userId: string, flowId: string) {
    const _channel = await db.query.channels.findFirst({
      where: and(
        eq(channels.userId, userId),
        ilike(channels.contactId, `%${getTestBotContactId(userId, flowId)}%`),
        eq(channels.deleted, false),
      ),
    })

    return _channel
  }

  public async getChannelForTestInTemplate(flowId: string) {
    const admin = await this.userService.getUserByEmail('admin@gmail.com')

    const _channel = await db.query.channels.findFirst({
      where: and(
        ilike(channels.contactId, `%${getTestBotContactId(admin.id, flowId)}%`),
        eq(channels.deleted, false),
        eq(channels.userId, admin.id),
      ),
    })

    return _channel
  }

  public async getAll(userId: string) {
    return db.query.channels.findMany({
      where: and(eq(channels.userId, userId), eq(channels.deleted, false)),
    })
  }

  public async countTotalChannels(userId: string) {
    const [{ count }] = await db
      .select({ count: sql<number>`cast(count(${channels.id}) as integer)` })
      .from(channels)
      .where(
        and(
          eq(channels.deleted, false),
          eq(channels.userId, userId),
          notIlike(channels.contactId, `%${TEST_YOUR_BOT_CHANNEL}%`),
        ),
      )

    return count
  }

  public async findOneByContactIdAndAdminId(
    contactId: string,
    adminId: string,
  ) {
    const expectedChannel = await db
      .select({
        id: channels.id,
        contactId: channels.contactId,
        contactName: channels.contactName,
        channelType: channelTypes.name,
        credentials: channels.credentials,
        flowId: channels.flowId,
        userId: channels.userId,
      })
      .from(channels)
      .where(
        and(
          eq(channels.contactId, contactId),
          eq(channels.deleted, false),
          eq(channels.userId, adminId),
        ),
      )
      .innerJoin(channelTypes, eq(channels.channelTypeId, channelTypes.id))

    if (!expectedChannel) return null

    return expectedChannel[0]
  }
}
