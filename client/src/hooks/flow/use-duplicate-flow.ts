import { flowApi } from '@/apis/flow'
import { ROUTES } from '@/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const useDuplicateFlow = () => {
  const { t } = useTranslation('common')
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: ({
      flowName,
      templateName,
    }: {
      flowName: string
      templateName: string
    }) => {
      return flowApi.duplicateTemplate({
        flowName,
        templateName,
      })
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ['templates'],
      })

      toast.success(data.message)

      navigate(`${ROUTES.PRIVATE.FLOW.INDEX}/${data.data.id}`)
    },

    onError(err: any) {
      toast.error(err?.response?.data?.message || t('api_error'))
    },
  })
}
