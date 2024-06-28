import { PUBLIC_DOMAIN } from '@/config'
import { BOT_EVENT } from '@/constants'
import { logger } from '@/utils/logger'
import axios from 'axios'
import { Request, Response } from 'express'
import { BaseChannel } from './base.channel'

export class LineChannel extends BaseChannel {
  pageToken: string
  linePostURL: string
  credentials: string

  constructor(
    id: string,
    contactId: string,
    contactName: string,
    channelType: string,
    credentials: string,
  ) {
    super(id, contactId, contactName, channelType)

    let parseCredentials: LineChannel

    this.credentials = credentials

    if (credentials && typeof credentials == 'string')
      parseCredentials = JSON.parse(credentials)

    if (parseCredentials) {
      this.pageToken = parseCredentials.pageToken
    }

    this.channelType = channelType
    this.linePostURL = `https://api.line.me/v2/bot`
  }

  public async registerWebhook() {
    try {
      await axios({
        method: 'PUT',
        url: this.linePostURL + '/channel/webhook/endpoint',
        data: { endpoint: PUBLIC_DOMAIN + '/webhook/' + this.contactId },
        headers: {
          Authorization: `Bearer ${this.pageToken}`,
          'Content-Type': 'application/json',
        },
      })
      logger.info(
        `[LIN] Registered webhook for ${this.channelType} - ${this.contactName} ${this.contactId}`,
      )
    } catch (e) {
      logger.info(
        `[LIN] Can not register webhook for ${this.channelType} - ${this.contactName} ${this.contactId}`,
      )
    }
  }

  async getLineUserID() {
    try {
      const { data } = await axios({
        method: 'GET',
        url: this.linePostURL + '/info',
        headers: {
          Authorization: `Bearer ${this.pageToken}`,
        },
      })
      if (!data || !data.userId) throw new Error()

      return data.userId
    } catch (e) {
      logger.info(
        `[LIN] Can not get user ID for ${this.channelType} - ${this.contactName} ${this.contactId}`,
      )
    }
  }

  async prepareMessage(req: Request, res: Response) {
    try {
      const { destination, events } = req.body

      if (!(events && events[0] && (events[0].type == 'message' || events[0].type == 'postback'))) return

      const lineUserId = await this.getLineUserID()

      if (destination != lineUserId) throw new Error('destination not match user Id')

      const { message, source, postback } = events[0]

      const userInput = message ? message.text : (postback ? postback.data : '');

      if (!userInput) throw new Error('User input can not empty')

      await this.postMessageToBot({
        userId: source.userId,
        message: userInput,
        data: null,
        isTest: false,
      })
    } catch (err) {
      logger.info('[LIN] prepareMessage failed: ' + err.message || err)
      return;
    }
  }

  public async sendMessageToUser({ userId, text, type, channelData }) {
    try {
      if (!type) throw new Error('Type can not be empty')

      if (type === BOT_EVENT.MESSAGE) return await this.sendTextMessageToUser({ userId, text, channelData })
      else if (type === BOT_EVENT.IMAGE) return this.sendImageToUser({ userId, channelData })
    } catch (err) {
      logger.info('[LIN] sendMessageToUser failed: ' + err.message || err)
    }
    return
  }

  async sendTextMessageToUser({ userId, text, channelData }) {
    try {
      if (Array.isArray(channelData.extendData) && channelData.extendData.length) {
        return this.detectTemple({
          userId,
          type: channelData.type,
          extendData: channelData.extendData,
          text,
        })
      }

      if (!text) throw new Error('Text can not be empty')

      await axios({
        method: 'POST',
        url: this.linePostURL + '/message/push',
        data: {
          to: userId,
          messages: [{ type: 'text', text }],
        },
        headers: {
          Authorization: 'Bearer ' + this.pageToken,
        },
      })

      logger.info(
        `[LIN] Bot send message to User ${userId} - Message: ${text}`,
      )
    } catch (e) {
      logger.info(
        `[LIN] Bot send message to User ${userId} failed - Error: ${e.message}`,
      )
    }
  }

  async sendImageToUser({ userId, channelData }) {
    try {
      if (!channelData || !channelData.imageUrl) throw new Error('Image can not be empty')
      await axios({
        method: 'POST',
        url: this.linePostURL + '/message/push',
        data: {
          to: userId,
          messages: [{ type: 'image', originalContentUrl: channelData.imageUrl, previewImageUrl: channelData.imageUrl }],
        },
        headers: {
          Authorization: 'Bearer ' + this.pageToken,
        },
      })

      logger.info(
        `[LIN] Bot send image to User ${userId} - imageUrl: ${channelData.imageUrl}`,
      )
    } catch (e) {
      logger.info(
        `[LIN] Bot send image to User ${userId} failed - Error: ${e.message}`,
      )
    }
  }

  async detectTemple({ userId, type, extendData, text }) {
    switch (type) {
      case 'list-card':
        return await this.sendGenericTemplate({ userId, extendData })
        break
      case 'list-button':
        return await this.sendQuickReplies({ userId, buttons: extendData, text })
      default:
        logger.info(`[LIN] Line does not support template type ${type}`)
        break
    }
  }

  async sendButtons({ userId, buttons, text }) {
    try {
      const option = {
        method: 'POST',
        url: this.linePostURL + '/message/push',
        data: {
          to: userId,
          messages: [
            {
              type: 'template',
              altText: 'buttons template',
              template: {
                type: 'confirm',
                text: text,
                actions: buttons,
              },
            },
          ],
        },
        headers: {
          Authorization: 'Bearer ' + this.pageToken,
        },
      }

      await axios(option)
    } catch (e) {
      console.log('[LIN] send message to User failed: ' + e.message)
    }
  }

  async sendGenericTemplate({ userId, extendData }) {
    try {
      const option = {
        method: 'POST',
        url: this.linePostURL + '/message/push',
        data: {
          to: userId,
          messages: [
            {
              type: 'template',
              altText: 'generic template',
              template: {
                type: 'carousel',
                columns: extendData,
              },
            },
          ],
        },
        headers: {
          Authorization: 'Bearer ' + this.pageToken,
        },
      }

      await axios(option)
    } catch (e) {
      console.log('LNE send message to User failed')
    }
  }

  async sendQuickReplies({ userId, buttons, text }) {
    try {
      const option = {
        method: 'POST',
        url: this.linePostURL + '/message/push',
        data: {
          to: userId,
          messages: [
            {
              type: 'text',
              text,
              quickReply: {
                items: buttons,
              }
            }
          ],
        },
        headers: {
          Authorization: 'Bearer ' + this.pageToken,
        },
      }

      await axios(option)
    } catch (e) {
      console.log('[LIN] send message to User failed: ' + e.message)
    }
  }
}
