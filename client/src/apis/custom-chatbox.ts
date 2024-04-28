import { ENDPOINTS } from '@/constants'
import http_client from '@/lib/http-client'
import { TCustomChatBox as TInputCustomChatBox } from '@/lib/schema/custom-chatbox'
import { TCustomChatBox } from '@/types/custom-chatbox'
import { TBaseResponse } from '@/types/share'

export class CustomChatBoxApi {
  getByChannelId(channelId: string): Promise<TBaseResponse<TCustomChatBox>> {
    return http_client.get(
      ENDPOINTS.CUSTOM_CHATBOX.INDEX.replace(':channelId', channelId),
    )
  }

  update(
    channelId: string,
    data: TInputCustomChatBox,
  ): Promise<TBaseResponse<TCustomChatBox>> {
    return http_client.put(
      ENDPOINTS.CUSTOM_CHATBOX.INDEX.replace(':channelId', channelId),
      data,
    )
  }
}

export const customChatBoxApi = new CustomChatBoxApi()
