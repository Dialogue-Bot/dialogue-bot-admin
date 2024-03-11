import { userApi } from '@/apis/user'
import { TChangePass } from '@/lib/schema/change-pass'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

export const useChangePass = () => {
  const { t } = useTranslation('common')
  return useMutation({
    mutationFn: (data: TChangePass) => {
      return userApi.changePass(data)
    },
    onSuccess(data) {
      toast.success(data.message)
    },
    onError(err: any) {
      toast.error(err?.response?.data?.message || t('api_error'))
    },
  })
}
