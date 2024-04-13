import { db } from '@/database/db'
import { messages } from '@/database/schema'
import { TNewMessage } from '@/database/types'
import { desc, eq } from 'drizzle-orm'
import { Service } from 'typedi'

@Service()
export class MessageService {
  async createMessage(data: TNewMessage) {
    return db.insert(messages).values(data)
  }

  async getMessagesByConversationId(conversationId: string) {
    return db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(desc(messages.createdAt))
  }
}
