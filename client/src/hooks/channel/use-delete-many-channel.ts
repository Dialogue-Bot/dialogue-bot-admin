import { channelApi } from '@/apis/channel'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

export const useDeleteManyChannel = () => {
  const { t } = useTranslation('common')
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (obj: Record<string, any>) => {
      const ids = Object.keys(obj)
      return channelApi.deleteMany(ids)
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
