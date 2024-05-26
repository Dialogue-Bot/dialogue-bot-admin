import { cn } from '@/lib/utils'
import { Outlet, useParams } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'
import Sidebar from './sidebar'

export const Layout = () => {
  const { userId, channelId } = useParams()
  const matches = useMediaQuery('(max-width: 767px)')

  return (
    <div className='flex h-screen'>
      <div
        className={cn('md:max-w-80 w-full ', {
          hidden: matches && userId && channelId,
        })}
      >
        <Sidebar />
      </div>
      <div
        className={cn('flex-1', {
          hidden: matches && (!userId || !channelId),
        })}
      >
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
