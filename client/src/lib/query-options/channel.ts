import { channelApi } from '@/apis/channel'
import { TChannelQuery } from '@/types/channel'
import { keepPreviousData, queryOptions } from '@tanstack/react-query'

export const queryChannelTypesOption = queryOptions({
  queryKey: ['channel-types'],
  queryFn: async () => {
    const res = await channelApi.getChannelTypes()

    return res.data
  },
  staleTime: Infinity,
})

export const queryChannelTypeOption = (id: string) => {
  return queryOptions({
    queryKey: ['channel-type', id],
    queryFn: async () => {
      const res = await channelApi.getChannelType(id)

      return res.data
    },
    staleTime: Infinity,
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

export const queryChannelsForSelectOption = (flowId: string) => {
  return queryOptions({
    queryKey: ['channels-for-select', flowId],
    queryFn: async () => {
      const res = await channelApi.getChannelsForSelect(flowId)

      return res.data
    },
    staleTime: 1000 * 60 * 60,
  })
}

export const queryChannelForTestOption = (flowId: string) =>
  queryOptions({
    queryKey: ['channel-for-test', flowId],
    queryFn: async () => {
      const res = await channelApi.getChannelForTest()

      return res.data
    },
    staleTime: Infinity,
  })
