import { WebChannel } from '@/channels/web.channel'
import { SOCKET_EVENTS } from '@/constants'
import { logger } from '@/utils/logger'
import { Socket } from 'socket.io'
import { Service } from 'typedi'
import { ChannelService } from './channels.service'

const USERS: Record<string, any> = {}

@Service()
export class SocketService {
  constructor(private readonly chanelService: ChannelService) { }
  public handleSocketEvents(socket: Socket) {
    socket.on(SOCKET_EVENTS.MESSAGE, (data) => {
      this.handleIncomingMessage(socket, data)
    })

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      this.handleLeaveRoom(socket)
    })
  }

  private async handleIncomingMessage(io: Socket, data: any) {
    const { address, message } = data

    if (!address || !message) return

    const [contactId, userId] = address.split('_')

    // io.to(userId).emit(SOCKET_EVENTS.RECEIVED, data)

    const expectedChannel = await this.chanelService.findOneByContactId(
      contactId,
    )

    if (!expectedChannel) {
      logger.info(`[Socket Service] Can not find channel!`)
    }

    if (expectedChannel?.channelType === 'WEB') {
      const { id, contactName, channelType, credentials } = expectedChannel
      const webChannel = new WebChannel(
        id,
        contactId,
        contactName,
        channelType,
        credentials,
      )

      await webChannel.postMessageToBot({ userId, message, data: '' })
    }
  }

  public handleJoinRoom(socket: Socket) {
    const query = socket.handshake.query
    const userId = query.userId
    console.log('userId', userId);
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
}
