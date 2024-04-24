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

  public async postMessageToBot({ userId, message = '', data, isTest, type = 'message', typeName = '' }) {
    const uid = this.initConversationId(userId)
    try {
      const postMsg = await axios({
        method: 'POST',
        url: BOT_ENDPOINT,
        data: {
          id: uid,
          type: type,
          typeName: typeName,
          conversation: {
            id: uid,
          },
          from: {
            id: userId,
          },
          recipient: {
            id: this.contactId,
          },
          testBot: isTest || false,
          data: data || false,
          text: message,
          channelId: this.channelType,
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

  public async sendEndConversation({ userId, isTest, type, typeName }) {
    const uid = this.initConversationId(userId)
    try {
      const postEventEndConversation = await axios({
        method: 'POST',
        url: BOT_ENDPOINT,
        data: {
          id: uid,
          type: type || 'event',
          typeName: typeName || 'endConversation',
          conversation: {
            id: uid,
          },
          from: {
            id: userId,
          },
          recipient: {
            id: this.contactId,
          },
          testBot: isTest || false,
          text: '',
          channelId: this.channelType,
          serviceUrl: PUBLIC_DOMAIN,
        },
      })
      if (postEventEndConversation.data.success) {
        logger.info(
          `[${this.channelType}] User ${userId} send event end conversation Bot`,
        )
      }
    } catch (error) {
      logger.info(
        `[${this.channelType}] User ${userId} can not send event end conversation Bot - Error: ${error.message}`,
      )
    }
  }
}