import { WebChannel } from '@/channels/web.channel'
import { SOCKET_EVENTS } from '@/constants'
import { ExpectedChannel } from '@/interfaces/channels.interface'
import {
  IAgentMessageData,
  IMessageData,
  IUserChatAgent,
} from '@/interfaces/socket.interface'
import { logger } from '@/utils/logger'
import { Socket } from 'socket.io'
import { Service } from 'typedi'
import { App } from '../app'
import { ChannelService } from './channels.service'
import { ConversationLiveChatService } from './conversation-live-chat.service'
import { MessageService } from './message.service'

const USERS: Record<string, any> = {}

@Service()
export class SocketService {
  usersChatWithAgent: IUserChatAgent[]

  constructor(
    private readonly chanelService: ChannelService,
    private readonly conversationLiveChatService: ConversationLiveChatService,
    private readonly messageService: MessageService,
  ) {
    this.usersChatWithAgent = []
    this.setIntervalUserDisconnectAgent()
  }

  public subscribe(userId: string) {
    this.usersChatWithAgent.push({ userId, lastMessageAt: new Date() })
  }

  public unsubscribe(userId: string) {
    this.usersChatWithAgent = this.usersChatWithAgent.filter(
      (uid) => uid.userId !== userId,
    )
  }

  public update(userId: string) {
    const userIndex = this.usersChatWithAgent.findIndex(
      (uid) => uid.userId === userId,
    )
    if (userIndex != -1) {
      this.usersChatWithAgent[userIndex].lastMessageAt = new Date()
    }
  }

  public notify({ adminId, userId, type }) {
    if (this.find(userId) && App.io) {
      switch (type) {
        case SOCKET_EVENTS.NOTIFICATION_CONNECT_AGENT:
          App.io
            .to(userId)
            .emit(type || SOCKET_EVENTS.NOTIFICATION_CONNECT_AGENT, {
              userId,
              adminId,
            })
          logger.info(
            `[Socket Service] User ${userId} send notification connect Agent ${adminId}`,
          )
          break
      }
    }
  }

  private setIntervalUserDisconnectAgent() {
    setInterval(() => {
      if (this.usersChatWithAgent.length) {
        logger.info(
          '[Socket Service] RUN FILTER USERS TIME OUT CHAT WITH AGENT',
        )
        this.usersChatWithAgent = this.usersChatWithAgent.filter((uid) => {
          const timeDifference = Math.abs(
            new Date().getTime() - uid.lastMessageAt.getTime(),
          )
          if (timeDifference >= 300000) {
            logger.info(`User ${uid.userId} disconnected Agent`)
            return false
          }
          // remove user after 5 minutes not send message to agent
          return true
        })
      }
    }, 10000)
  }

  private find(userId: string) {
    return this.usersChatWithAgent.find((u) => u.userId === userId)
  }

  public handleSocketEvents(socket: Socket) {
    socket.on(SOCKET_EVENTS.MESSAGE, (data) => {
      this.handleIncomingMessage(socket, data)
    })

    socket.on(SOCKET_EVENTS.AGENT_MESSAGE, (data) => {
      this.handleIncomingAgentMessage(socket, data)
    })

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      this.handleLeaveRoom(socket)
    })
  }

  private async handleIncomingMessage(io: Socket, data: IMessageData) {
    try {
      const { address, message, isTest, type, typeName } = data
      console.log('[Socket Service] socket data:' + JSON.stringify(data))

      if (!address || (!message && !type)) return

      const [contactId, userId] = address.split('_')

      const expectedChannel = await this.chanelService.findOneByContactId(
        contactId,
      )

      if (!expectedChannel) {
        throw new Error(`[Socket Service] Can not find channel!`)
      }

      if (expectedChannel.channelType === 'WEB') {
        if (type) {
          return await this.sendEventToBot(
            userId,
            type,
            typeName,
            expectedChannel,
            isTest,
          )
        }
        await this.sendMessageToBot(
          userId,
          message,
          expectedChannel,
          isTest,
        )
      }
    } catch (error) {
      logger.info(error.message)
    }
  }

  public handleJoinRoom(socket: Socket) {
    const query = socket.handshake.query
    const [userId] = typeof query.userId === 'string' && query.userId.split('_')
    socket.join(userId)

    USERS[userId as string] = socket
    logger.info(`[Socket Service] User ${userId} joined room`)

    logger.info(`[Socket Service] Total users: ${Object.keys(USERS).length}`)

    logger.info(`[Socket Service] Users: ${Object.keys(USERS).join(', ')}`)

    return socket
  }

  public handleLeaveRoom(socket: Socket) {
    const query = socket.handshake.query
    const userId = query.userId
    socket.leave(userId as string)

    delete USERS[userId as string]
    logger.info(`[Socket Service] User ${userId} left room`)

    logger.info(`[Socket Service] Total users: ${Object.keys(USERS).length}`)

    logger.info(`[Socket Service] Users: ${Object.keys(USERS).join(', ')}`)

    return socket
  }

  private async sendMessageToBot(
    userId: string,
    message: string,
    expectedChannel: ExpectedChannel,
    isTest: boolean,
  ) {
    const { id, contactName, channelType, credentials, contactId } =
      expectedChannel
    if (!isTest) {
      await this.saveConversationMessage(userId, contactId, message)
    }
    const webChannel = new WebChannel(
      id,
      contactId,
      contactName,
      channelType,
      credentials,
    )

    await webChannel.postMessageToBot({
      userId,
      message: message,
      data: '',
      isTest,
      type: 'message',
      typeName: '',
    })
  }

  private async sendEventToBot(
    userId: string,
    type: string,
    typeName: string,
    expectedChannel: ExpectedChannel,
    isTest: boolean,
  ) {
    const { id, contactName, channelType, credentials, contactId } =
      expectedChannel

    if (!isTest) {
      await this.updateEndDateConversation(userId, contactId, typeName)
    }

    const webChannel = new WebChannel(
      id,
      contactId,
      contactName,
      channelType,
      credentials,
    )

    await webChannel.postMessageToBot({
      userId,
      message: '',
      data: '',
      isTest,
      type: type,
      typeName: typeName,
    })
  }

  private async saveConversationMessage(
    userId: string,
    contactId: string,
    message: string,
  ) {
    let convExisted = await this.conversationLiveChatService.getConversation(
      userId,
      contactId,
    )
    if (!convExisted) {
      convExisted = await this.conversationLiveChatService.createConversation({
        userId,
        contactId,
      })
    }
    await this.messageService.createMessage({
      conversationId: convExisted.userId,
      from: userId,
      to: 'bot',
      message,
      type: 'text',
    })
  }

  private async updateEndDateConversation(
    userId: string,
    contactId: string,
    typeName: string,
  ) {
    if (typeName === 'endConversation') {
      console.log('Updated conversation')

      await this.conversationLiveChatService.updateConversation({
        userId,
        contactId,
        data: {
          endedAt: new Date(),
        },
      })
    }
  }

  private async handleIncomingAgentMessage(
    socket: Socket,
    data: IAgentMessageData,
  ) {
    try {
      const query = socket.handshake.query
      const [userId, agentId] =
        typeof query.userId === 'string' && query.userId.split('_')

      const { contactId, message, type } = data

      const expectedChannel =
        await this.chanelService.findOneByContactIdAndAdminId(
          contactId,
          agentId,
        )

      if (!expectedChannel) {
        throw new Error(
          `[Socket Service] handleIncomingAgentMessage can not find channel with ContactId ${contactId} and AdminId ${agentId}`,
        )
      }

      const { id, contactName, channelType, credentials } = expectedChannel

      if (channelType !== 'WEB') {
        throw new Error(
          `[Socket Service] handleIncomingAgentMessage chat with agent does not support for channel ${channelType}`,
        )
      }

      const webChannel = new WebChannel(
        id,
        contactId,
        contactName,
        channelType,
        credentials,
      )
      if (!this.find(userId)) {
        this.subscribe(userId)
        await webChannel.sendEndConversation(userId)
      }

      await webChannel.sendMessageToUser({
        userId,
        text: message || '',
        type: type || 'message',
        channelData: null,
      })
    } catch (error) {
      logger.info(error.message)
    }
  }
}
