import { Outlet } from 'react-router-dom'
import Footer from './footer'
import Header from './header'

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
