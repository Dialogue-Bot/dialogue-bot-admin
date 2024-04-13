import { db } from '@/database/db'
import { selectAllFields } from '@/database/helper'
import { conversations, messages } from '@/database/schema'
import { TNewMessage } from '@/database/types'
import { and, desc, eq } from 'drizzle-orm'
import { Service } from 'typedi'

@Service()
export class MessageService {
  async createMessage(data: TNewMessage) {
    return db.insert(messages).values(data)
  }

  async getMessages({
    channelId,
    userId,
  }: {
    channelId: string
    userId: string
  }) {
    return db
      .select(selectAllFields(messages))
      .from(messages)
      .innerJoin(
        conversations,
        eq(messages.conversationId, conversations.userId),
      )
      .where(
        and(
          eq(messages.conversationId, userId),
          eq(conversations.channelId, channelId),
        ),
      )
      .orderBy(desc(messages.createdAt))
  }
}
