import { auth } from '@/apis/auth'
import { queryOptions } from '@tanstack/react-query'

export const currentUserQueryOptions = () =>
  queryOptions({
    queryKey: ['current-user'],
    queryFn: () =>
      auth
        .getCurrentUser()
        .then((res) => res.data)
        .catch(() => null),
  })
