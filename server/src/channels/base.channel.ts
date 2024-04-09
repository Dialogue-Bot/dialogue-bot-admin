import { BOT_ENDPOINT, PUBLIC_DOMAIN } from '@/config'
import { logger } from '@/utils/logger'
import axios from 'axios'

export class BaseChannel {
  id: string
  contactId: string
  contactName: string
  channelType: string

  constructor(
    id: string,
    contactId: string,
    contactName: string,
    channelType: string,
  ) {
    this.id = id
    this.contactId = contactId
    this.contactName = contactName
    this.channelType = channelType
  }

  public async postMessageToBot({ userId, message = '', data, isTest }) {
    const uid = this.initConversationId(userId)
    try {
      const postMsg = await axios({
        method: 'POST',
        url: BOT_ENDPOINT,
        data: {
          conversation: {
            id: uid,
          },
          from: {
            id: userId,
          },
          recipient: {
            id: this.contactId,
          },
          data: data || false,
          text: message,
          type: 'message',
          id: uid,
          channelId: this.channelType,
          isTest,
          serviceUrl: PUBLIC_DOMAIN,
        },
      })
      if (postMsg.data.success) {
        logger.info(
          `[${this.channelType}] User ${userId} send message to Bot - Message: ${message} - Data: ${data}`,
        )
      }
    } catch (error) {
      logger.info(
        `[${this.channelType}] User ${userId} can not send message to Bot - Message: ${message} - Error: ${error.message}`,
      )
    }
  }

  initConversationId(userId: string) {
    return this.contactId + '-' + userId
  }
}