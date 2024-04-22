import { userSubscriptionApi } from '@/apis/user-subscription'
import { queryOptions } from '@tanstack/react-query'

export const queryCurrentUserSubscription = queryOptions({
  queryKey: ['user-subscription'],
  queryFn: async () => {
    const res = await userSubscriptionApi.getCurrentUserSubscription()

    return res.data
  },
})

export const queryUsageSubscription = queryOptions({
  queryKey: ['usage-subscription'],
  queryFn: async () => {
    const res = await userSubscriptionApi.getUsageSubscription()

    return res.data
  },
})
