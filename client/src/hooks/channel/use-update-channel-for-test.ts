import { channelApi } from '@/apis/channel'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateChannelForTest = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (flowId: string) => {
      const res = await channelApi.updateChannelForTest(flowId)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['channel-for-test'],
      })
    },
  })
}
