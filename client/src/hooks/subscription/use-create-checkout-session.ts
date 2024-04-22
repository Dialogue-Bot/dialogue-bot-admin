import { subscriptionApi } from '@/apis/subscription'
import { ROUTES } from '@/constants'
import { stripePromise } from '@/lib/stripe'
import { useUserStore } from '@/store'
import { TCreateSubscriptionCheckoutSession } from '@/types/subscription'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export const useCreateCheckoutSession = () => {
  const { user } = useUserStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: TCreateSubscriptionCheckoutSession) => {
      if (!user) {
        navigate(
          `${ROUTES.AUTH.LOGIN}?redirect=${encodeURIComponent(
            window.location.href,
          )}`,
        )
        return null
      }

      const stripe = await stripePromise

      const res = await subscriptionApi.createCheckoutSession(data)

      if (res.data.type === 'checkout') {
        await stripe?.redirectToCheckout({
          sessionId: res.data.sessionId,
        })
      } else {
        window.location.href = res.data.url
      }
    },
  })
}
