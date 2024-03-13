import { userApi } from '@/apis/user'
import { TUpdateInfor } from '@/lib/schema/update-infor'
import { useUserStore } from '@/store/use-user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

export const useUpdateInfor = () => {
  const { setUser, user } = useUserStore()
  const { t } = useTranslation('common')
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TUpdateInfor) => {
      return userApi.updateInfor(data)
    },
    onMutate(variables) {
      if (!user) return

      const previousUser = user

      setUser({
        ...user,
        ...variables,
      })

      return { previousUser }
    },

    onError(err: any, _variables, context) {
      if (context?.previousUser) {
        setUser(context.previousUser)
      }

      toast.error(err?.response?.data?.message || t('api_error'))
    },
    onSuccess(data) {
      if (data.data) {
        setUser(data.data)
      }

      queryClient.invalidateQueries({
        queryKey: ['current-user'],
      })

      toast.success(data.message)
    },
  })
}
