import { flowApi } from '@/apis/flow'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

export const useDeleteFlow = () => {
  const { t } = useTranslation('common')
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      return flowApi.delete(id)
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ['flows'],
      })
      toast.success(data.message)
    },
    onError(err: any) {
      toast.error(err?.response?.data?.message || t('api_error'))
    },
  })
}
