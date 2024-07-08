import { ENDPOINTS } from '@/constants'
import http_client from '@/lib/http-client'
import { TChannelInput } from '@/lib/schema/channel'
import {
  TChannelQuery,
  TChannelQueryForSelect,
  TChannelType,
  TChannelWithChannelType,
} from '@/types/channel'
import { TBaseResponse, TResPagination, TSelectResponse } from '@/types/share'

class ChannelApi {
  getChannelType(id: string): Promise<TBaseResponse<TChannelType>> {
    return http_client.get(`${ENDPOINTS.CHANNEL.TYPES}/${id}`)
  }

  getChannelTypes(): Promise<TBaseResponse<TChannelType[]>> {
    return http_client.get(ENDPOINTS.CHANNEL.TYPES)
  }

  getChannels(
    query?: TChannelQuery,
  ): Promise<TResPagination<TChannelWithChannelType>> {
    return http_client.get(ENDPOINTS.CHANNEL.INDEX, {
      params: query,
    })
  }

  create(data: TChannelInput): Promise<TBaseResponse<TChannelWithChannelType>> {
    return http_client.post(ENDPOINTS.CHANNEL.INDEX, data)
  }

  update(
    id: string,
    data: TChannelInput,
  ): Promise<TBaseResponse<TChannelWithChannelType>> {
    return http_client.put(`${ENDPOINTS.CHANNEL.INDEX}/${id}`, data)
  }

  delete(id: string): Promise<TBaseResponse<null>> {
    return http_client.delete(`${ENDPOINTS.CHANNEL.DELETE}/${id}`)
  }

  deleteMany(ids: string[]): Promise<TBaseResponse<null>> {
    return http_client.delete(ENDPOINTS.CHANNEL.DELETES, {
      data: { ids },
    })
  }

  getChannelsForSelect(
    query: TChannelQueryForSelect,
  ): Promise<TBaseResponse<TSelectResponse<string, string>[]>> {
    return http_client.get(`${ENDPOINTS.CHANNEL.INDEX}/for-select`, {
      params: query,
    })
  }

  getChannelForTest(
    flowId: string,
  ): Promise<TBaseResponse<TChannelWithChannelType>> {
    return http_client.get(`${ENDPOINTS.CHANNEL.FOR_TEST}/${flowId}`)
  }

  updateChannelForTest(
    flowId: string,
  ): Promise<TBaseResponse<TChannelWithChannelType>> {
    return http_client.put(ENDPOINTS.CHANNEL.FOR_TEST, { flowId })
  }

  getChannelForTestTemplate(
    flowId: string,
  ): Promise<TBaseResponse<TChannelWithChannelType>> {
    return http_client.get(`${ENDPOINTS.CHANNEL.FOR_TEST_TEMPLATE}/${flowId}`)
  }
}

export const channelApi = new ChannelApi()
