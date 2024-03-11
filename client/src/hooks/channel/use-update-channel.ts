import { channelApi } from '@/apis/channel'
import { TChannelInput } from '@/lib/schema/channel'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

export const useUpdateChannel = () => {
  const { t } = useTranslation('common')
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ data, id }: { id: string; data: TChannelInput }) => {
      return channelApi.update(id, data)
    },
    onSuccess(data) {
      toast.success(data.message)
      queryClient.invalidateQueries({
        queryKey: ['channels'],
      })
    },
    onError(err: any) {
      toast.error(err?.response?.data?.message || t('api_error'))
    },
  })
}
