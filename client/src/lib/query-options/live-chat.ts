import { liveChatApi } from '@/apis/live-chat'
import { TConversationLiveChatQuery } from '@/types/live-chat'
import { queryOptions } from '@tanstack/react-query'

export const queryConversationsOptions = (q: TConversationLiveChatQuery) => {
  return queryOptions({
    queryKey: ['conversations', q],
    queryFn: async () => {
      const res = await liveChatApi.getConversations(q)

      return res.data
    },
  })
}

export const queryConversationOption = (channelId: string, userId: string) => {
  return queryOptions({
    queryKey: ['conversation', channelId],
    queryFn: async () => {
      const res = await liveChatApi.getConversation(channelId, userId)

      return res.data
    },
  })
}
