import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar'
export const Layout = () => {
  return (
    <div className='flex min-h-screen-header'>
      <Sidebar />
      <div className='ml-sidebar-setting w-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
