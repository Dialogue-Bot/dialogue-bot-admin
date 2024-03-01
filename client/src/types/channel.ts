import { TBaseQuery } from './share';

export enum ChannelType {
   MESSENGER = 'MSG',
   LINE = 'LIN',
   WEB = 'WEB',
}

export type TChannelType = {
   name: ChannelType;
   id: string;
   description: string;
   deleted?: boolean;
};

export type TChannel = {
   id: string;
   contactId: string;
   contactName: string;
   channelTypeId: string;
   credentials?: string;
   active: boolean;
   deleted?: boolean;
   userId: string;
   createdAt: string;
   updatedAt: string;
};

export type TChannelWithChannelType = TChannel & {
   channelType: string;
};

export type TChannelQuery = TBaseQuery & {
   orderBy: keyof TChannel;
};
