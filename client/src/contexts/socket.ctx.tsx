import { ROUTES, SOCKET_EVENTS } from '@/constants'
import { useUserStore } from '@/store'
import { createContext, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { Socket, io } from 'socket.io-client'
import { toast } from 'sonner'
import { useUnmount } from 'usehooks-ts'

export type TSocketCtx = {
  socket: Socket
}

export const SocketCtx = createContext<TSocketCtx>({} as TSocketCtx)

const URL = import.meta.env.DEV
  ? import.meta.env.VITE_DEV_API_URL
  : import.meta.env.VITE_PROD_API_URL

export type Props = {
  children: React.ReactNode
}

export const SocketProvider = ({ children }: Props) => {
  const { user } = useUserStore()
  const socketRef = useRef<Socket>(
    io(URL, {
      autoConnect: false,
      transports: ['websocket'],
      query: {
        userId: user?.id,
      },
    }),
  )
  const { t } = useTranslation('common')

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const socket = socketRef.current

    if (!user?.id) return

    socket.connect()

    return () => {
      socket.disconnect()
    }
  }, [location.pathname, navigate, t, user?.id])

  useUnmount(() => {
    socketRef.current.disconnect()
  })

  useEffect(() => {
    if (location.pathname.includes(ROUTES.PRIVATE.CONVERSATION.INDEX)) {
      socketRef.current.disconnect()
    }
  }, [location.pathname])

  useEffect(() => {
    socketRef.current.on(
      SOCKET_EVENTS.NOTIFICATION_CONNECT_AGENT,
      ({ userId, channelId }) => {
        toast.info(t('agent_notify'), {
          action: {
            onClick: () => {
              navigate(
                `${ROUTES.PRIVATE.CONVERSATION.INDEX}/${userId}/${channelId}`,
              )
            },
            label: t('view'),
          },
        })
      },
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SocketCtx.Provider
      value={{
        socket: socketRef.current,
      }}
    >
      {children}
    </SocketCtx.Provider>
  )
}
