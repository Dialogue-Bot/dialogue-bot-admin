export interface IUserChatAgent {
  userId: string
  lastMessageAt: Date
}

export interface IMessageData {
  address: string
  message: string
  isTest: boolean
  type: string
  typeName: string
}

export interface IAgentMessageData {
  contactId: string
  message: string
  type: string
}
