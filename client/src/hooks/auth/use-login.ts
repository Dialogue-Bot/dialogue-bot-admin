import { auth } from '@/apis/auth'
import { TLogin } from '@/lib/schema/login'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

export const useLogin = () => {
  const { t } = useTranslation('common')
  const [search] = useSearchParams()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (data: TLogin) => {
      return auth.login(data)
    },
    async onSuccess() {
      window.location.href = search.get('redirect') || '/flows'
    },
    onError(err: any) {
      toast.error(err?.response?.data?.message || t('api_error'))

      if (err?.response?.data?.errorKey === 'EMAIL_NOT_VERIFIED') {
        navigate('/request-verify-account')
      }
    },
  })
}
