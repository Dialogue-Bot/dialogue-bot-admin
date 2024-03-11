import { auth } from '@/apis/auth'
import { TSetPass } from '@/lib/schema/set-pass'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

export const useSetPass = () => {
  const { t } = useTranslation('common')
  const [search] = useSearchParams()
  return useMutation({
    mutationFn: (data: TSetPass) => {
      const token = search.get('token') || ''

      return auth.setPassword({
        ...data,
        token,
      })
    },
    onSuccess(data) {
      toast.success(data.message)
    },
    onError(err: any) {
      toast.error(err?.response?.data?.message || t('api_error'))
    },
  })
}
