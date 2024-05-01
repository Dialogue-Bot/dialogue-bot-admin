import { LineChannel } from '@/channels/line.channel'
import { MessengerChannel } from '@/channels/messenger.channel'
import { WebChannel } from '@/channels/web.channel'
import { BOT_EVENT, SOCKET_EVENTS } from '@/constants'
import { logger } from '@/utils/logger'
import { Request } from 'express-serve-static-core'
import { Service } from 'typedi'
import { ChannelService } from './channels.service'
import { SocketService } from './socket.service'


@Service()
export class ConversationService {
  constructor(
    private readonly chanelService: ChannelService,
    private readonly socketService: SocketService,
  ) { }

  public async handleIncomingMessage(req: Request) {
    const { from, recipient, text, type, channelData } = req.body;

    console.log('[ConversationService] Incoming message:', req.body);

    const expectedChannel = await this.chanelService.findOneByContactId(from.id)

    if (!expectedChannel) logger.info('Can not find channel to send to user!')

    const { id, contactName, channelType, credentials } = expectedChannel

    switch (channelType) {
      case 'MSG':
        const messengerChannel = new MessengerChannel(
          id,
          from.id,
          contactName,
          channelType,
          credentials,
        )

        if (type == BOT_EVENT.MESSAGE)
          return await messengerChannel.sendMessageToUser({
            userId: recipient.id,
            text,
            channelData,
          })

        if ([BOT_EVENT.TYPING, BOT_EVENT.STOP_TYPING].includes(type))
          return await messengerChannel.sendActionToUser({
            userId: recipient.id,
            type,
          })

        break
      case 'LIN':
        const lineChannel = new LineChannel(
          id,
          from.id,
          contactName,
          channelType,
          credentials,
        )

        if (type == BOT_EVENT.MESSAGE)
          return await lineChannel.sendMessageToUser({
            userId: recipient.id,
            text,
            channelData,
          })

        break
      case 'WEB':
        const webChannel = new WebChannel(
          id,
          from.id,
          contactName,
          channelType,
          credentials,
        )
        if (type == BOT_EVENT.CONNECT_AGENT) {
          this.socketService.subscribe(recipient.id);
          this.socketService.notify({
            userId: recipient.id,
            adminId: expectedChannel.userId,
            type: SOCKET_EVENTS.NOTIFICATION_CONNECT_AGENT
          })
          return await webChannel.sendMessageToUser({
            userId: recipient.id,
            text,
            type: BOT_EVENT.MESSAGE,
            channelData,
          })
        }

        return await webChannel.sendMessageToUser({
          userId: recipient.id,
          text,
          type,
          channelData,
        })

      default:
        logger.info(
          `[Incoming message] Send message to Bot - Does not support channel type ${channelType}`,
        )
        break
    }
  }
}
