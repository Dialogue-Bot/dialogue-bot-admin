import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar'

export const Layout = () => {
  return (
    <div className='flex h-screen-header'>
      <Sidebar />
      <div className='flex-1'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
