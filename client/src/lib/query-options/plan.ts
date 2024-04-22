import { planApi } from '@/apis/plan.api'
import { queryOptions } from '@tanstack/react-query'

export const queryPlansOptions = queryOptions({
  queryKey: ['plans'],
  queryFn: async () => {
    const res = await planApi.getAllPlans()

    return res.data
  },
  staleTime: Infinity,
})
