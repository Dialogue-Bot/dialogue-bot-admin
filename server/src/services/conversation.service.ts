import { MessengerChannel } from "@/channels/messenger.channel";
import { Request } from "express-serve-static-core";
import { Service } from "typedi";
import { ChannelService } from "./channels.service";

@Service()
export class ConversationService {
    constructor(
        private readonly chanelService: ChannelService
    ) { }

    public async handleIncomingMessage(req: Request) {
        const { from, recipient, text, type, channelData } = req.body;

        const expectedChannel = await this.chanelService.findOneByContactId(from.id);

        if (!expectedChannel) console.log('Can not find channel to send to user!');

        const { id, contactName, channelType, credentials } = expectedChannel;

        switch (channelType) {
            case 'MSG':
                const messengerChannel = new MessengerChannel(id, from.id, contactName, channelType, credentials);

                if (type == 'message') return await messengerChannel.sendMessageToUser({ userId: recipient.id, text })

                if (['typing', 'stop-typing'].includes(type)) return await messengerChannel.sendActionToUser({ userId: recipient.id, type });

                break;
            default:
                console.log(`Send message to Bot: Does not support channel type ${channelType}`);
                break;
        }
    }
}