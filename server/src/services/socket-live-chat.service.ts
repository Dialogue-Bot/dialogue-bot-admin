import { WebChannel } from '@/channels/web.channel'
import { SOCKET_EVENTS } from '@/constants'
import { ExpectedChannel } from '@/interfaces/channels.interface'
import { logger } from '@/utils/logger'
import { Socket } from 'socket.io'
import { Service } from 'typedi'
import { ChannelService } from './channels.service'
import { ConversationLiveChatService } from './conversation-live-chat.service'
import { MessageService } from './message.service'

const USERS: Record<string, any> = {}

@Service()
export class SocketLiveChatService {
    constructor(
        private readonly chanelService: ChannelService,
        private readonly conversationLiveChatService: ConversationLiveChatService,
        private readonly messageService: MessageService,
    ) { }

    public handleSocketLiveChatEvents(socket: Socket) {
        socket.on(SOCKET_EVENTS.MESSAGE, (data) => {
            this.handleIncomingLiveChatMessage(socket, data)
        })

        socket.on(SOCKET_EVENTS.DISCONNECT, () => {
            this.handleLiveChatLeaveRoom(socket)
        })
    }

    private async handleIncomingLiveChatMessage(io: Socket, data: any) {
        const { address, message, isTest, type, typeName } = data
        console.log('socket data:' + JSON.stringify(data))

        if (!address || (!message && !type)) return

        const [contactId, userId] = address.split('_')

        const expectedChannel = await this.chanelService.findOneByContactId(
            contactId,
        )

        if (!expectedChannel) {
            logger.info(`[Socket Service] Can not find channel!`)
        }

        if (expectedChannel?.channelType === 'WEB') {
            if (type) {
                await this.sendEventToBot(userId, type, typeName, expectedChannel, isTest);
            }
            // if (this.find(userId)) {
            //   // send message to admin
            // }
            else {
                await this.sendMessageToBot(userId, message, expectedChannel, isTest)
            }
        }
    }

    public handleLiveChatJoinRoom(socket: Socket) {
        const query = socket.handshake.query
        const userId = query.userId
        socket.join(userId)

        USERS[userId as string] = socket
        logger.info(`[Socket Live Chat Service] User ${userId} joined room`)

        logger.info(`[Socket Live Chat Service] Total users: ${Object.keys(USERS).length}`)

        logger.info(`[Socket Live Chat Service] Users: ${Object.keys(USERS).join(', ')}`)

        return socket
    }

    public handleLiveChatLeaveRoom(socket: Socket) {
        const query = socket.handshake.query
        const userId = query.userId
        socket.leave(userId as string)

        delete USERS[userId as string]
        logger.info(`[Socket Live Chat Service] User ${userId} left room`)

        logger.info(`[Socket Live Chat Service] Total users: ${Object.keys(USERS).length}`)

        logger.info(`[Socket Live Chat Service] Users: ${Object.keys(USERS).join(', ')}`)

        return socket
    }

    async sendMessageToBot(userId: string, message: string, expectedChannel: ExpectedChannel, isTest: boolean) {
        const { id, contactName, channelType, credentials, contactId } = expectedChannel
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

    async sendEventToBot(userId: string, type: string, typeName: string, expectedChannel: ExpectedChannel, isTest: boolean) {
        const { id, contactName, channelType, credentials, contactId } = expectedChannel

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

    async saveConversationMessage(userId: string, contactId: string, message: string) {
        let convExisted =
            await this.conversationLiveChatService.getConversation(
                userId,
                contactId,
            )
        if (!convExisted) {
            convExisted =
                await this.conversationLiveChatService.createConversation({
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

    async updateEndDateConversation(userId: string, contactId: string, typeName: string) {
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
}
