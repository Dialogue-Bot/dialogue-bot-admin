import { ENDPOINTS } from '@/constants'
import http_client from '@/lib/http-client'

class LiveChatApi {
  async getConversations() {
    return http_client.get(ENDPOINTS.CONVERSATION_LIVE_CHAT.INDEX)
  }
}
