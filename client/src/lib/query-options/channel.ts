import { channelApi } from '@/apis/channel'
import { TChannelQuery } from '@/types/channel'
import { keepPreviousData, queryOptions } from '@tanstack/react-query'

export const queryChannelTypesOption = queryOptions({
  queryKey: ['channel-types'],
  queryFn: async () => {
    const res = await channelApi.getChannelTypes()

    return res.data
  },
})

export const queryChannelTypeOption = (id: string) => {
  return queryOptions({
    queryKey: ['channel-type', id],
    queryFn: async () => {
      const res = await channelApi.getChannelType(id)

      return res.data
    },
  })
}

export const queryChannelsOption = (query?: TChannelQuery) => {
  return queryOptions({
    queryKey: ['channels', query],
    queryFn: async () => {
      const res = await channelApi.getChannels(query)

      return res.data
    },
    placeholderData: keepPreviousData,
  })
}
