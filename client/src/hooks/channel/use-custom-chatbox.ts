import { customChatBoxApi } from '@/apis/custom-chatbox'
import { TCustomChatBox } from '@/lib/schema/custom-chatbox'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

export const useCustomChatBox = () => {
  const { t } = useTranslation('common')
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: TCustomChatBox) => {
      return customChatBoxApi.update(data.channelId, data)
    },
    onSuccess(data) {
      toast.success(data.message)
      queryClient.invalidateQueries({
        queryKey: ['custom-chatbox'],
      })
    },
    onError(err: any) {
      toast.error(err?.response?.data?.message || t('api_error'))
    },
  })
}
