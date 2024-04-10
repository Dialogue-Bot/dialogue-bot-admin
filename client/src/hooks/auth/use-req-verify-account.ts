import { auth } from '@/apis/auth'
import { TEmail } from '@/lib/schema/mail'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

export const useRequestVerifyAccount = () => {
  const { t } = useTranslation('common')
  return useMutation({
    mutationFn: (data: TEmail) => {
      return auth.requestVerifyAccount(data.email)
    },
    onSuccess(data) {
      toast.success(data.message)
    },
    onError(err: any) {
      toast.error(err?.response?.data?.message || t('api_error'))
    },
  })
}
