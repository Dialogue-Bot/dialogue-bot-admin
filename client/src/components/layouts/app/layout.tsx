import Sidebar from './sidebar'
import { Header } from './header'
import { Outlet } from 'react-router-dom'
import { cn } from '@/lib/utils'

type Props = {
  showHeader?: boolean
}

export const Layout = ({ showHeader = true }: Props) => {
  return (
    <div className='flex min-h-svh '>
      {showHeader && <Header />}
      <Sidebar />
      <div
        className={cn('ml-sidebar w-full', {
          'mt-header': showHeader,
        })}
      >
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
