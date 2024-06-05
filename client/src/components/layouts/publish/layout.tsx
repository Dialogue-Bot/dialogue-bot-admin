import { ScrollTop } from '@/components/scroll-top'
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
            src='https://api.dialoguebot.tech/public/script/chatbox.js'
            data-channelId='testshop2123'
            id='testshop2123'
            async
            type='text/javascript'
            data-custom='{"logoUrl":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1ib3QtbWVzc2FnZS1zcXVhcmUiPjxwYXRoIGQ9Ik0xMiA2VjJIOCIvPjxwYXRoIGQ9Im04IDE4LTQgNFY4YTIgMiAwIDAgMSAyLTJoMTJhMiAyIDAgMCAxIDIgMnY4YTIgMiAwIDAgMS0yIDJaIi8+PHBhdGggZD0iTTIgMTJoMiIvPjxwYXRoIGQ9Ik05IDExdjIiLz48cGF0aCBkPSJNMTUgMTF2MiIvPjxwYXRoIGQ9Ik0yMCAxMmgyIi8+PC9zdmc+","name":"DialogueBot","color":"#2563eb","buttonSize":40,"position":{"x":24,"y":24},"windowSize":{"width":320,"height":500},"channelId":"oo13z31myq27cnzos1vag6ue","id":"bndo8wsfos8q1pvfa6ngzvee"}'
          ></script>
        )}
      </Helmet>
      <Header />
      <Outlet />
      <Footer />
      <ScrollTop />
    </>
  )
}

export default Layout
