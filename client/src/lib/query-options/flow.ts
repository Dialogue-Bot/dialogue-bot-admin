import { flowApi } from '@/apis/flow'
import { TBaseQuery } from '@/types/share'
import { keepPreviousData, queryOptions } from '@tanstack/react-query'

export const queryFlowsOption = (query?: TBaseQuery) => {
  return queryOptions({
    queryKey: ['flows', query],
    queryFn: async () => {
      const res = await flowApi.getAll(query)

      return res.data
    },
    placeholderData: keepPreviousData,
  })
}

export const queryFlowOption = (id: string) => {
  return queryOptions({
    queryKey: ['flow', id],
    queryFn: async () => {
      const res = await flowApi.get(id)

      return res.data
    },
  })
}
