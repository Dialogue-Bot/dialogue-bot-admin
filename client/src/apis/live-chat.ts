import { ENDPOINTS } from '@/constants'
import http_client from '@/lib/http-client'
import { TConversation, TConversationLiveChatQuery } from '@/types/live-chat'
import { TBaseResponse, TResPagination } from '@/types/share'

class LiveChatApi {
  async getConversations(
    q?: TConversationLiveChatQuery,
  ): Promise<TResPagination<TConversation>> {
    return http_client.get(ENDPOINTS.CONVERSATION_LIVE_CHAT.INDEX, {
      params: q,
    })
  }

  async getConversation(
    channelId: string,
    userId: string,
  ): Promise<TBaseResponse<TConversation>> {
    return http_client.get(
      `${ENDPOINTS.CONVERSATION_LIVE_CHAT.INDEX}/${userId}/${channelId}`,
    )
  }
}

export const liveChatApi = new LiveChatApi()
