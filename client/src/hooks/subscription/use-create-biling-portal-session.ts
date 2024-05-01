import { subscriptionApi } from '@/apis/subscription'
import { ROUTES } from '@/constants'
import { useUserStore } from '@/store'
import { TCreateBillingPortalSession } from '@/types/subscription'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export const useCreateBillingPortalSession = () => {
  const { user } = useUserStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: TCreateBillingPortalSession) => {
      if (!user) {
        navigate(
          `${ROUTES.AUTH.LOGIN}?redirect=${encodeURIComponent(
            window.location.href,
          )}`,
        )
        return null
      }

      const res = await subscriptionApi.createBillingPortalSession(data)

      window.location.href = res.data
    },
  })
}
