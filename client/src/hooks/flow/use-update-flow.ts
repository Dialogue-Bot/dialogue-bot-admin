import { flowApi } from '@/apis/flow'
import { TFlowInput } from '@/lib/schema/flow-input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

/**
 * Custom hook for updating a flow.
 * @returns A mutation function for updating a flow.
 */
export const useUpdateFlow = () => {
  const { t } = useTranslation('common')
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ data, id }: { data: TFlowInput; id: string }) => {
      return flowApi.update(id, data)
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ['flows'],
      })
      queryClient.invalidateQueries({
        queryKey: ['channels-for-select'],
      })
      queryClient.invalidateQueries({
        queryKey: ['flow-detail', data.data.id],
      })

      toast.success(data.message)
    },

    onError(err: any) {
      toast.error(err?.response?.data?.message || t('api_error'))
    },
  })
}
