import { channelApi } from '@/apis/channel'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

export const useDeleteChannel = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation('common')
  return useMutation({
    mutationFn: async (id: string) => {
      return channelApi.delete(id)
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
