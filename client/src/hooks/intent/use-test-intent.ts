import { intentApi } from '@/apis/intent'
import { TTestIntent } from '@/lib/schema/test-intent'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

export const useTestIntent = () => {
  const { t } = useTranslation('common')
  return useMutation({
    mutationFn: async (data: TTestIntent) => {
      const res = await intentApi.test(data)

      return res
    },
    onError(err: any) {
      toast.error(err?.response?.data?.message || t('api_error'))
    },
    onSuccess(data) {
      toast.success(data.message)
    },
  })
}
