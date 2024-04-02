import { intentApi } from '@/apis/intent'
import { ROUTES } from '@/constants'
import { TIntentInput } from '@/types/intent'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const useUpdateIntent = () => {
  const { t } = useTranslation('common')
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async ({ id, data }: { data: TIntentInput; id: string }) => {
      return intentApi.update(id, data)
    },
    onSuccess(data, { id }) {
      queryClient.invalidateQueries({
        queryKey: ['intent', id],
      })

      toast.success(data.message)

      navigate(ROUTES.PRIVATE.TRAINING.INDEX)
    },

    onError(err: any) {
      toast.error(err?.response?.data?.message || t('api_error'))
    },
  })
}
