import { db } from '@/database/db'
import { selectAllFields } from '@/database/helper'
import { conversations, messages } from '@/database/schema'
import { TMessage, TNewMessage } from '@/database/types'
import { and, asc, eq, gte } from 'drizzle-orm'
import { Service } from 'typedi'
import { ChannelService } from './channels.service'

@Service()
export class MessageService {
  constructor(private readonly channelService: ChannelService) {}

  async createMessage(data: TNewMessage) {
    return db.insert(messages).values(data)
  }

  async getMessages({
    userId,
    contactId,
  }: {
    userId: string
    contactId: string
  }) {
    const channel = await this.channelService.findOneByContactId(contactId)

    const rows = (await db
      .select(selectAllFields(messages))
      .from(messages)
      .innerJoin(
        conversations,
        eq(messages.conversationId, conversations.userId),
      )
      .where(
        and(
          eq(messages.conversationId, userId),
          eq(conversations.channelId, channel?.id),
          gte(messages.createdAt, conversations.endedAt),
        ),
      )
      .orderBy(asc(messages.createdAt))) as unknown as Array<TMessage>

    return rows.map((row) => {
      return {
        template: row.template,
        message: row.message,
        createdAt: row.createdAt,
        isBot: row.from === 'bot',
        userId: row.to === userId ? row.to : row.from,
      }
    })
  }
}
