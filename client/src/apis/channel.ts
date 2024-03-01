import { ENDPOINTS } from '@/constants';
import http_client from '@/lib/http-client';
import { TChannelInput } from '@/lib/schema/channel';
import {
   TChannelQuery,
   TChannelType,
   TChannelWithChannelType,
} from '@/types/channel';
import { TBaseResponse, TResPagination } from '@/types/share';

class ChannelApi {
   getChannelType(id: string): Promise<TBaseResponse<TChannelType>> {
      return http_client.get(`${ENDPOINTS.CHANNEL.TYPES}/${id}`);
   }

   getChannelTypes(): Promise<TBaseResponse<TChannelType[]>> {
      return http_client.get(ENDPOINTS.CHANNEL.TYPES);
   }

   getChannels(
      query?: TChannelQuery
   ): Promise<TResPagination<TChannelWithChannelType>> {
      return http_client.get(ENDPOINTS.CHANNEL.INDEX, {
         params: query,
      });
   }

   create(
      data: TChannelInput
   ): Promise<TBaseResponse<TChannelWithChannelType>> {
      return http_client.post(ENDPOINTS.CHANNEL.INDEX, data);
   }

   update(
      id: string,
      data: TChannelInput
   ): Promise<TBaseResponse<TChannelWithChannelType>> {
      return http_client.put(`${ENDPOINTS.CHANNEL.INDEX}/${id}`, data);
   }

   delete(id: string): Promise<TBaseResponse<null>> {
      return http_client.delete(`${ENDPOINTS.CHANNEL.DELETE}/${id}`);
   }

   deleteMany(ids: string[]): Promise<TBaseResponse<null>> {
      return http_client.delete(ENDPOINTS.CHANNEL.DELETES, {
         data: { ids },
      });
   }
}

export const channelApi = new ChannelApi();
