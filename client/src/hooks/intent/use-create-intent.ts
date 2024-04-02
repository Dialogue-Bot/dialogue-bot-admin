import { intentApi } from '@/apis/intent'
import { ROUTES } from '@/constants'
import { TIntentInput } from '@/types/intent'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const useCreateIntent = () => {
  const { t } = useTranslation('common')
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (data: TIntentInput) => {
      return intentApi.create(data)
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ['intents'],
      })

      toast.success(data.message)

      console.log(data)

      navigate(ROUTES.PRIVATE.TRAINING.INDEX)
    },

    onError(err: any) {
      toast.error(err?.response?.data?.message || t('api_error'))
    },
  })
}
