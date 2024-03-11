import { auth } from '@/apis/auth'
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
    onSuccess(data) {
      toast.success(data.message)
      navigate('/login')
    },
    onError(err: any) {
      toast.error(err?.response?.data?.message || t('api_error'))
    },
  })
}
