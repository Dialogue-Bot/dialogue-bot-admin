import { WebChannel } from "@/channels/web.channel";
import { logger } from "@/utils/logger";
import { Socket } from "socket.io";
import { Service } from "typedi";
import { ChannelService } from "./channels.service";

@Service()
export class SocketService {
    constructor(
        private readonly chanelService: ChannelService,
    ) { }
    public handleSocketEvents(socket: Socket) {
        socket.on('message', (data) => {
            this.handleIncomingMessage(socket, data);
        })
    }

    private async handleIncomingMessage(io: Socket, data: any) {
        const { address, message } = data;

        if (!address || !message) return;

        const contactId = address.split('_')[0];
        const userId = address.split('_')[1];

        io.to(userId).emit('received', data);

        const expectedChannel = await this.chanelService.findOneByContactId(contactId);

        if (!expectedChannel) {
            logger.info(`[Socket Service] Can not find channel!`);
        }

        if (expectedChannel.channelType === 'WEB') {
            const { id, contactName, channelType, credentials } = expectedChannel;
            const webChannel = new WebChannel(
                id,
                contactId,
                contactName,
                channelType,
                credentials,
            );

            await webChannel.postMessageToBot({ userId, message, data: '' })
        }
    }
}