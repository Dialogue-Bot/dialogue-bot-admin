import { auth } from '@/apis/auth'
import { TForgotPass } from '@/lib/schema/forgot-pass'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

export const useForgotPass = () => {
  const { t } = useTranslation('common')
  return useMutation({
    mutationFn: (data: TForgotPass) => {
      return auth.forgotPassword(data)
    },
    onSuccess(data) {
      toast.success(data.message)
    },
    onError(err: any) {
      toast.error(err?.response?.data?.message || t('api_error'))
    },
  })
}
