import { SocketCtx } from '@/contexts/socket.ctx'
import { useContext } from 'react'

export const useSocket = () => {
  const ctx = useContext(SocketCtx)

  if (!ctx) {
    throw new Error('useSocket must be used within a SocketProvider')
  }

  return ctx
}
