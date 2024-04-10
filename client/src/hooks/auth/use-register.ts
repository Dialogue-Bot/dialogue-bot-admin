import { auth } from '@/apis/auth'
import { ROUTES } from '@/constants'
import { TRegister } from '@/lib/schema/register'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const useRegister = () => {
  const { t } = useTranslation('common')
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (data: TRegister) => {
      return auth.register(data)
    },
    onSuccess(data, variables) {
      toast.success(data.message)
      navigate(
        `${ROUTES.AUTH.REQUEST_VERIFY_ACCOUNT}?send=true&email=${variables.email}`,
      )
    },
    onError(err: any) {
      toast.error(err?.response?.data?.message || t('api_error'))
    },
  })
}
