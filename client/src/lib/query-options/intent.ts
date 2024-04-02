import { intentApi } from '@/apis/intent'
import { TBaseQuery } from '@/types/share'
import { keepPreviousData, queryOptions } from '@tanstack/react-query'

export const queryIntentsOption = (query?: TBaseQuery) => {
  return queryOptions({
    queryKey: ['intents', query],
    queryFn: async () => {
      const res = await intentApi.getAll(query)

      return res.data
    },
    placeholderData: keepPreviousData,
  })
}

export const queryIntentOption = (id: string) => {
  return queryOptions({
    queryKey: ['flow', id],
    queryFn: async () => {
      const res = await intentApi.get(id)

      return res.data
    },
  })
}
