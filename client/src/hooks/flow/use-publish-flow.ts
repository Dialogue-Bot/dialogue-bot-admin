import { flowApi } from '@/apis/flow'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

export const usePublishFlow = () => {
  const { t } = useTranslation('common')
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return flowApi.publish(id)
    },
    onSuccess(data, { id }) {
      queryClient.invalidateQueries({
        queryKey: ['flows'],
      })
      queryClient.invalidateQueries({
        queryKey: ['channels-for-select'],
      })
      queryClient.invalidateQueries({
        queryKey: ['flow-detail', id],
      })

      toast.success(data?.message)
    },

    onError(err: any) {
      toast.error(err?.response?.data?.message || t('api_error'))
    },
  })
}
