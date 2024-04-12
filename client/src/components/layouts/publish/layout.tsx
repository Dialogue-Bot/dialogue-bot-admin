import { ROUTES } from '@/constants'
import { Helmet } from 'react-helmet'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './footer'
import Header from './header'

export const Layout = () => {
  const location = useLocation()
  return (
    <>
      <Helmet>
        {Object.values(ROUTES.PUBLIC).some((route) =>
          location.pathname.includes(route),
        ) && (
          <script
            src={`http://localhost:8080/public/script/chatbox.js`}
            // @ts-ignore
            channelId='tzb87ljlsf6lhuqtfzhtxgev'
            id='tzb87ljlsf6lhuqtfzhtxgev'
            async
            type='text/javascript'
          />
        )}
      </Helmet>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
