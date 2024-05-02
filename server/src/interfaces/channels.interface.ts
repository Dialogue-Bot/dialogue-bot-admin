export interface ChannelExtend {
  id: string
  contactId: string
  contactName: string
  channelType: string
  credentials: string
  active: boolean
  createdAt: Date
  updatedAt: Date
  flowId: string
}

export interface ChannelInfo {
  id: string
  contactId: string
  contactName: string
  channelType: string
  credentials: string
}

export interface MessengerInfo {
  pageToken: string
  webhookSecret: string
}

export interface ChannelType {
  id: string
  name: string
  description: string
  deleted: boolean
}

export interface MessengerButton {
  type: string
  url: string
  title: string
}

export interface ExpectedChannel {
  id: string
  contactId: string
  contactName: string
  channelType: string
  credentials: string
  flowId: string
  userId: string
}
