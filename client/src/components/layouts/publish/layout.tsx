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
            channelId='Test'
            id='Test'
            async
            type='text/javascript'
            custom={JSON.stringify({
              logoUrl:
                'https://cdn.chatbot.com/widget/61f28451fdd7c5000728b4f9/1SjqcDI0.png',
              name: 'Hoang Huy',
              color: '#7c0e2f',
              buttonSize: 50,
              position: { x: 16, y: 16 },
              windowSize: { width: 400, height: 500 },
              channelId: 'ukdh5avg2euau67n6uxjgt1j',
              id: 'mof3drfre3gb8od0nqufezz8',
            })}
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
