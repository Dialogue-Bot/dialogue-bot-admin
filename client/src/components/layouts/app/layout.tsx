import { SocketProvider } from '@/contexts/socket.ctx'
import { cn } from '@/lib/utils'
import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar'

type Props = {
  showHeader?: boolean
}

export const Layout = (_props: Props) => {
  return (
    <SocketProvider>
      <div className='flex min-h-svh '>
        <Sidebar />
        <div className={cn('ml-sidebar w-full')}>
          <Outlet />
        </div>
      </div>
    </SocketProvider>
  )
}

export default Layout
