export type TConversation = {
  id: string
  userId: string
  channelId: string
  createdAt: string
  updatedAt: string
  lastMessage: TMessage
}

export type TMessage = {
  id: string
  conversationId: string
  createdAt: string
  from: string
  to: string
  type: string
  data: {
    text?: string
    buttons?: Array<{
      type: 'postback' | 'web_url'
      title: string
      payload?: string
      url?: string
    }>
    cards?: Array<{
      title: string
      subtitle: string
      image_url: string
      buttons: Array<{
        type: 'postback' | 'web_url'
        title: string
        payload?: string
        url?: string
      }>
    }>
    url?: string
  }
}
