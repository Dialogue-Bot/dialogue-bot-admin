import { customChatBoxApi } from '@/apis/custom-chatbox'
import { queryOptions } from '@tanstack/react-query'

export const queryCustomChatBoxOptions = (channelId: string) =>
  queryOptions({
    queryKey: ['custom-chatbox', channelId],
    queryFn: async () => {
      const res = await customChatBoxApi.getByChannelId(channelId)

      return res.data
    },
    staleTime: Infinity,
  })
