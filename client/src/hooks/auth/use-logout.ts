import { auth } from '@/apis/auth'
import { auth as fAuth } from '@/lib/firebase'
import { useUserStore } from '@/store/use-user'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useLogout = () => {
  const { user, setUser } = useUserStore()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      if (user?.provider !== 'local') {
        await fAuth.signOut()
      }

      await auth.logout()
    },
    async onSuccess() {
      window.location.href = '/login'
      setUser(null)
      queryClient.clear()
      localStorage.removeItem('user-bot-id')
    },
    onError() {
      window.location.href = '/login'
      setUser(null)
      queryClient.clear()
      localStorage.removeItem('user-bot-id')
    },
  })
}
