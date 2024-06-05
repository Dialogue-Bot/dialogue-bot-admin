import { settingApi } from '@/apis/setting'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

export const useTestSendMail = () => {
  const { t } = useTranslation('common')
  return useMutation({
    mutationFn: async () => {
      return settingApi.sendTestMail()
    },
    onSuccess(data) {
      toast.success(data.message)
    },
    onError(err: any) {
      toast.error(err?.response?.data?.message || t('api_error'))
    },
  })
}
