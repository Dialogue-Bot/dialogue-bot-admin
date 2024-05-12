import { WebChannel } from '@/channels/web.channel'
import { SOCKET_EVENTS } from '@/constants'
import { ExpectedChannel } from '@/interfaces/channels.interface'
import { IMessageData, IUserChatAgent } from '@/interfaces/socket.interface'
import { logger } from '@/utils/logger'
import { Socket } from 'socket.io'
import { Service } from 'typedi'
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
  ) {}

  public handleSocketEvents(socket: Socket) {
    socket.on(SOCKET_EVENTS.MESSAGE, (data) => {
      this.handleIncomingMessage(socket, data)
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

        await this.sendMessageToBot(userId, message, expectedChannel, isTest)
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
    const [userId] = typeof query.userId === 'string' && query.userId.split('_')
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

    // Save conversation message
    if (!isTest) {
      await this.saveConversationMessage({
        convId: userId,
        from: userId,
        to: 'bot',
        contactId,
        message,
      })
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

  private async saveConversationMessage({
    convId,
    from,
    contactId,
    to,
    message,
  }: {
    convId: string
    from: string
    contactId: string
    to: string
    message: string
  }) {
    from = from ?? 'user'
    to = to ?? 'bot'

    let convExisted = await this.conversationLiveChatService.getConversation(
      convId,
      contactId,
    )

    if (!convExisted) {
      convExisted = await this.conversationLiveChatService.createConversation({
        userId: convId,
        contactId,
      })
    }

    await this.messageService.createMessage({
      conversationId: convExisted.userId,
      from,
      to,
      message: message || '',
      type: 'text',
    })
  }
}
