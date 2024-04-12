import { PUBLIC_DOMAIN } from '@/config'
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

      if (!(events && events[0] && events[0].type == 'message')) return

      const lineUserId = await this.getLineUserID()

      if (destination == lineUserId) {
        const { message, source } = events[0]

        await this.postMessageToBot({
          userId: source.userId,
          message: message.text,
          data: null,
          isTest: false,
        })
      }
    } catch (e) { }
  }

  public async sendMessageToUser({ userId, text, channelData }) {
    const lineUserId = await this.getLineUserID();
    try {
      if (channelData && channelData.extendData.length) {
        return this.detectTemple({ userId, type: channelData.type, extendData: channelData.extendData, text });
      }
      if (!text) return

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
        `[LIN] Bot send message to User ${lineUserId} - Message: ${text}`,
      )
    } catch (e) {
      logger.info(
        `[LIN] Bot send message to User ${lineUserId} failed - Error: ${e.message}`,
      )
    }
  }

  async detectTemple({ userId, type, extendData, text }) {
    switch (type) {
      case 'list-card':
        return await this.sendGenericTemplate({ userId, extendData });
        break;
      case 'list-button':
        return await this.sendButtons({ userId, buttons: extendData, text });
      default:
        logger.info(
          `[LIN] Line does not support template type ${type}`
        );
        break;
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
              type: "template",
              altText: "buttons template",
              template: {
                type: "confirm",
                text: text,
                actions: buttons,
              }
            }
          ],
        },
        headers: {
          Authorization: 'Bearer ' + this.pageToken,
        },
      };

      await axios(option);
    } catch (e) {
      console.log('[LIN] send message to User failed: ' + e.message);
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
              type: "template",
              altText: "generic template",
              template: {
                type: "carousel",
                columns: extendData,
              }
            }
          ],
        },
        headers: {
          Authorization: 'Bearer ' + this.pageToken,
        },
      };

      await axios(option);
    } catch (e) {
      console.log('LNE send message to User failed');
    }
  }
}
