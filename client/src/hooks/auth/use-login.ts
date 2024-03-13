import { auth } from '@/apis/auth'
import { TLogin } from '@/lib/schema/login'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

export const useLogin = () => {
  const { t } = useTranslation('common')
  const [search] = useSearchParams()
  return useMutation({
    mutationFn: (data: TLogin) => {
      return auth.login(data)
    },
    async onSuccess() {
      window.location.href = search.get('redirect') || '/chatbots'
    },
    onError(err: any) {
      console.log(err)
      toast.error(err?.response?.data?.message || t('api_error'))
    },
  })
}
