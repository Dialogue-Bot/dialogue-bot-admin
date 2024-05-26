import { cn } from '@/lib/utils'
import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar'

type Props = {
  showHeader?: boolean
}

export const Layout = (_props: Props) => {
  return (
    <div className='flex min-h-svh '>
      <Sidebar />
      <div
        className={cn('ml-sidebar')}
        style={{ width: 'calc(100% - 3.75rem)' }}
      >
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
