import { BOT_EVENT } from '@/constants'
import { arrayToObj } from '@/utils/helper'
import { logger } from '@/utils/logger'
import axios from 'axios'
import { Request, Response } from 'express'
import { BaseChannel } from './base.channel'

export class MessengerChannel extends BaseChannel {
  pageToken: string
  webhookSecret: string
  messengerPostURL: string
  credentials: string

  constructor(
    id: string,
    contactId: string,
    contactName: string,
    channelType: string,
    credentials: string,
  ) {
    super(id, contactId, contactName, channelType)

    let parseCredentials: MessengerChannel

    this.credentials = credentials

    if (credentials && typeof credentials == 'string')
      parseCredentials = JSON.parse(credentials)

    if (parseCredentials) {
      this.pageToken = parseCredentials.pageToken
      this.webhookSecret = parseCredentials.webhookSecret
    }

    this.channelType = channelType
    this.messengerPostURL = `https://graph.facebook.com/v18.0/me/messages?access_token=`
  }

  public verifyWebhook(req: Request, res: Response) {
    let mode = req.query['hub.mode']
    let token = req.query['hub.verify_token']
    let challenge = req.query['hub.challenge']

    if (mode === 'subscribe' && this.webhookSecret == token) {
      logger.info(
        `[MSG] channel ${this.channelType} - ${this.contactName} ${this.contactId} webhook verified!`,
      )
      return challenge
    } else {
      console.error(
        `[MSG] Verification channel ${this.channelType} - ${this.contactName} ${this.contactId} failed!`,
      )
      return
    }
  }

  public async prepareMessage(req: Request, res: Response) {
    const { object, entry } = req.body

    if (object != 'page' || !Array.isArray(entry)) return

    entry.forEach((pageEntry) => {
      if (!Array.isArray(pageEntry.messaging)) return

      pageEntry.messaging.forEach(async (messagingEvent) => {
        if (messagingEvent.messaging_customer_information)
          return await this.sendAddressToBot({
            userId: messagingEvent.sender.id,
            address:
              messagingEvent.messaging_customer_information.screens[0]
                .responses,
          })

        if (!messagingEvent.message && !messagingEvent.postback) return

        const senderId = messagingEvent.sender.id
        const messageText =
          messagingEvent.message && messagingEvent.message.text
        const payload =
          messagingEvent.postback && messagingEvent.postback.payload
        const quick_reply =
          messagingEvent.message &&
          messagingEvent.message.quick_reply &&
          messagingEvent.message.quick_reply.payload

        if (senderId == this.contactId) return //Agent replied to user => skip

        return await this.postMessageToBot({
          userId: senderId,
          message: quick_reply || messageText || payload,
          data: null,
          isTest: false,
        })
      })
    })
  }

  async sendAddressToBot({ userId, address }) {
    return await this.postMessageToBot({
      userId,
      message: 'ADDRESS',
      data: { USER_INFORMATION: arrayToObj(address) },
      isTest: false,
    })
  }

  public async sendMessageToUser({ userId, text, type, channelData }) {
    try {
      if (!type) throw new Error('Type can not be empty')

      if (type === BOT_EVENT.MESSAGE)
        return await this.sendTextMessageToUser({ userId, text, channelData })
      else if (type === BOT_EVENT.IMAGE)
        return await this.sendImageToUser({ userId, channelData })
    } catch (err) {
      console.log('[MSG] sendMessageToUser failed: ' + err.message || err)
    }
    return
  }

  public async sendTextMessageToUser({ userId, text, channelData }) {
    try {
      if (
        Array.isArray(channelData.extendData) &&
        channelData.extendData.length
      ) {
        return await this.detectTemple({
          userId,
          type: channelData.type,
          extendData: channelData.extendData,
          text,
        })
      }

      if (!text) throw new Error('Text can not be empty')

      await axios({
        method: 'POST',
        url: this.messengerPostURL + this.pageToken,
        data: {
          messaging_type: 'RESPONSE',
          recipient: {
            id: userId,
          },
          message: { text },
        },
      })

      logger.info(`[MSG] Bot Sent message to User ${userId} - Message: ${text}`)
    } catch (e) {
      logger.info(
        `[MSG] Bot Sent message to User ${userId} failed - Error: ${e.message}`,
      )
    }
  }

  public async sendImageToUser({ userId, channelData }) {
    try {
      if (!channelData || !channelData.imageUrl)
        throw new Error('Image can not be empty')
      const extendData = [
        {
          image_url: channelData.imageUrl,
        },
      ]
      await this.sendGenericTemplate({ userId, extendData })
      logger.info(
        `[MSG] Bot Sent image to User ${userId} - ImageUrl: ${channelData.imageUrl}`,
      )
    } catch (err) {
      console.log('[MSG] Bot Sent image to User: ' + err.message || err)
    }
  }

  public async sendActionToUser({ userId, type }) {
    const types = {
      typing: 'TYPING_ON',
    }

    if (!types[type]) return

    try {
      await axios({
        method: 'POST',
        url: this.messengerPostURL + this.pageToken,
        data: {
          messaging_type: 'RESPONSE',
          recipient: {
            id: userId,
          },
          sender_action: types[type],
        },
      })
    } catch (e) {
      logger.info(
        `[MSG] Messenger can not send action to User - Error: ${e.message}`,
      )
    }
  }

  async sendButtons({ userId, buttons, text }) {
    try {
      await axios({
        method: 'POST',
        url: this.messengerPostURL + this.pageToken,
        data: {
          recipient: {
            id: userId,
          },
          message: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'button',
                text: text,
                buttons: buttons,
              },
            },
          },
        },
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  async sendQuickReply({ userId, buttons, text }) {
    try {
      if (!text) throw new Error('Text can not be empty')
      await axios({
        method: 'POST',
        url: this.messengerPostURL + this.pageToken,
        data: {
          recipient: {
            id: userId,
          },
          messaging_type: 'RESPONSE',
          message: {
            text,
            quick_replies: buttons,
          },
        },
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  async sendGenericTemplate({ userId, extendData }) {
    try {
      await axios({
        method: 'POST',
        url: this.messengerPostURL + this.pageToken,
        data: {
          recipient: {
            id: userId,
          },
          message: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'generic',
                elements: extendData,
              },
            },
          },
        },
      })
    } catch (error) {
      console.error('sendGenericTemplate error: ' + error.message)
      console.error(error)
    }
  }

  async detectTemple({ userId, type, extendData, text }) {
    switch (type) {
      case 'list-card':
        return await this.sendGenericTemplate({ userId, extendData })
      case 'list-button':
        return await this.sendQuickReply({ userId, buttons: extendData, text })
      default:
        logger.info(`[MSG] Messenger does not support template type ${type}`)
        break
    }
  }
}
