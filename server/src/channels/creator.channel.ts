import { AUTO_REGISTER_WEBHOOK } from "@/config";
import { ChannelInfo } from "@/interfaces/channels.interface";
import { LineChannel } from "./line.channel";
import { MessengerChannel } from "./messenger.channel";
import { WebChannel } from "./web.channel";

export class Creator {
    static createChannel(channel: ChannelInfo) {
        try {
            const { id, contactId, contactName, channelType, credentials } = channel;

            switch (channelType) {
                case 'MSG':
                    return new MessengerChannel(
                        id,
                        contactId,
                        contactName,
                        channelType,
                        credentials,
                    )
                case 'LIN':
                    const linChannel = new LineChannel(
                        id,
                        contactId,
                        contactName,
                        channelType,
                        credentials,
                    )
                    if (AUTO_REGISTER_WEBHOOK == '1') {
                        linChannel.registerWebhook();
                    }
                    return linChannel
                case 'WEB':
                    return new WebChannel(
                        id,
                        contactId,
                        contactName,
                        channelType,
                        credentials,
                    )
                default:
                    throw new Error(`Does not support channel type ${channel.channelType}`);
                    break;
            }
        } catch (err) {
            throw err;
        }
    }
}
