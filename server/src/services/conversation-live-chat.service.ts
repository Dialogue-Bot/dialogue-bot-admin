import { TEST_YOUR_BOT_CHANNEL } from '@/constants'
import { db } from '@/database/db'
import { jsonBuildObject, selectAllFields } from '@/database/helper'
import { channels, conversations, messages } from '@/database/schema'
import { TUpdateLiveChatConversation } from '@/database/types'
import {
  ConversationLiveChatCreateDto,
  ConversationLiveChatQueryDto,
} from '@/dtos/conversation-live-chat.dto'
import { and, desc, eq, ne, sql } from 'drizzle-orm'
import { Service } from 'typedi'
import { ChannelService } from './channels.service'

@Service()
export class ConversationLiveChatService {
  constructor(private readonly channelService: ChannelService) {}

  public async createConversation({
    contactId,
    userId,
  }: ConversationLiveChatCreateDto) {
    const channel = await this.channelService.findOneByContactId(contactId)

    const conversation = await this.getConversation(userId, channel?.contactId)

    console.log('conversation:', conversation)

    if (conversation) return conversation

    await db
      .insert(conversations)
      .values({ userId, channelId: channel?.id })
      .returning()

    return this.getConversation(userId, channel?.contactId)
  }

  public async getConversation(userId: string, contactId: string) {
    const channel = await this.channelService.findOneByContactId(contactId)

    return db.query.conversations.findFirst({
      where: and(
        eq(conversations.userId, userId),
        eq(conversations.channelId, channel?.id),
      ),
      with: { channel: true },
    })
  }

  public async getConversations(
    ownerId: string,
    query: ConversationLiveChatQueryDto,
  ) {
    const { channelId, page, limit } = query

    const lastMessage = db
      .select({
        conversationId: messages.conversationId,
        id: messages.id,
        maxCreatedAt: sql`max(${messages.createdAt})`.as('maxCreatedAt'),
        from: messages.from,
        to: messages.to,
        type: messages.type,
        template: messages.template,
        createdAt: messages.createdAt,
      })
      .from(messages)
      .groupBy(messages.conversationId, messages.id)
      .as('lastMessage')

    const where = and(
      eq(channels.userId, ownerId),
      channelId ? eq(conversations.channelId, channelId) : undefined,
      ne(channels.contactId, `${TEST_YOUR_BOT_CHANNEL}${ownerId}`),
    )

    const rows = await db
      .selectDistinctOn([conversations.userId], {
        userId: conversations.userId,
        channelId: conversations.channelId,
        createdAt: conversations.createdAt,
        updatedAt: conversations.updatedAt,
        lastMessage: jsonBuildObject({
          id: lastMessage.id,
          from: lastMessage.from,
          to: lastMessage.to,
          type: lastMessage.type,
          template: messages.template,
          createdAt: lastMessage.createdAt,
          conversationId: lastMessage.conversationId,
        }),
        channel: jsonBuildObject(selectAllFields(channels)),
        endedAt: conversations.endedAt,
      })
      .from(conversations)
      .innerJoin(channels, eq(conversations.channelId, channels.id))

      .leftJoin(messages, eq(messages.conversationId, conversations.userId))
      .leftJoin(
        lastMessage,
        and(
          eq(messages.conversationId, conversations.userId),
          eq(messages.createdAt, lastMessage.maxCreatedAt),
        ),
      )
      .where(where)
      .orderBy(conversations.userId, desc(lastMessage.maxCreatedAt))
      .limit(limit)
      .offset((page - 1) * limit)

    const [{ count }] = await db
      .select({
        count: sql<number>`cast(count(${conversations.userId}) as integer)`,
      })
      .from(conversations)
      .where(and(where))
      .innerJoin(channels, eq(conversations.channelId, channels.id))

    return {
      items: rows,
      totalItems: count,
    }
  }

  public async updateConversation({
    contactId,
    data,
    userId,
  }: {
    userId: string
    contactId: string
    data: TUpdateLiveChatConversation
  }) {
    const channel = await this.channelService.findOneByContactId(contactId)
    const [updated] = await db
      .update(conversations)
      .set(data)
      .where(
        and(
          eq(conversations.userId, userId),
          eq(conversations.channelId, channel?.id),
        ),
      )
      .returning()

    console.log('updated:', updated)

    return updated
  }
}
