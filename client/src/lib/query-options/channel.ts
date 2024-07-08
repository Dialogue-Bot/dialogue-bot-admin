import { channelApi } from '@/apis/channel'
import { TChannelQuery, TChannelQueryForSelect } from '@/types/channel'
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

export const queryChannelsForSelectOption = ({
  flowId,
  isForConversation,
}: TChannelQueryForSelect) => {
  return queryOptions({
    queryKey: ['channels-for-select', flowId, isForConversation],
    queryFn: async () => {
      const res = await channelApi.getChannelsForSelect({
        flowId,
        isForConversation,
      })

      return res.data
    },
    staleTime: 1000 * 60 * 60,
  })
}

export const queryChannelForTestOption = (flowId: string) =>
  queryOptions({
    queryKey: ['channel-for-test', flowId],
    queryFn: async () => {
      const res = await channelApi.getChannelForTest(flowId)

      return res.data
    },
    staleTime: Infinity,
  })

export const queryChannelForTestTemplateOption = (flowId: string) => {
  return queryOptions({
    queryKey: ['channel-for-test-template', flowId],
    queryFn: async () => {
      const res = await channelApi.getChannelForTestTemplate(flowId)

      return res.data
    },
    staleTime: Infinity,
  })
}
