import { auth } from '@/apis/auth'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

export const useVerifyAccount = () => {
  const [searchParams] = useSearchParams()
  return useQuery({
    queryKey: [
      'verify-account',
      searchParams.get('token'),
      new Date().getTime(),
    ],
    queryFn: () => {
      return auth.verifyAccount(searchParams.get('token') || '')
    },
  })
}
