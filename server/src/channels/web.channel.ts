import { SOCKET_EVENTS, TEST_YOUR_BOT_CHANNEL } from '@/constants'
import { ConversationLiveChatService } from '@/services/conversation-live-chat.service'
import { MessageService } from '@/services/message.service'
import { logger } from '@/utils/logger'
import { Request, Response } from 'express'
import Container from 'typedi'
import { App } from '../app'
import { BaseChannel } from './base.channel'

export class WebChannel extends BaseChannel {
  credentials: string
  public messageService = Container.get(MessageService)
  public conversationLiveChatService = Container.get(
    ConversationLiveChatService,
  )

  constructor(
    id: string,
    contactId: string,
    contactName: string,
    channelType: string,
    credentials: string,
  ) {
    super(id, contactId, contactName, channelType)
    this.channelType = channelType
    this.credentials = credentials
  }

  async prepareMessage(req: Request, res: Response) {
  }

  public async sendMessageToUser({
    userId,
    text,
    type,
    channelData,
  }: {
    type?: string
    userId: string
    text: string
    channelData: any
  }) {
    try {
      let result = {
        userId,
        type: type,
        message: text || '',
        url: channelData.imageUrl || '',
        template: {},
        isBot: true,
        createdAt: new Date(),
      }

      if (channelData) {
        result.template = {
          data: channelData.extendData,
          type: channelData.type,
        }
      }

      let convExisted = await this.conversationLiveChatService.getConversation(
        userId,
        this.contactId,
      )
      if (
        convExisted &&
        (type === 'message' || type === 'image') &&
        !this.contactId.includes(TEST_YOUR_BOT_CHANNEL)
      ) {
        await this.messageService.createMessage({
          conversationId: convExisted.userId,
          from: 'bot',
          to: result.userId,
          message: result.message || result.url,
          type:
            channelData && channelData.type === 'list-card'
              ? 'template'
              : 'text',
          template: result.template,
        })
      }

      console.log(
        '[WEB] Bot send message to User - userId: ' +
        userId +
        ' - type: ' +
        type +
        ' - message: ' +
        result.message +
        ' - channelData: ' +
        JSON.stringify(channelData),
      )
      if (App.io) {
        App.io.to(userId).emit(type || SOCKET_EVENTS.MESSAGE, result)
      }
    } catch (e) {
      logger.info(`[WEB] Bot send message to User failed - Error: ${e.message}`)
    }
  }
}
