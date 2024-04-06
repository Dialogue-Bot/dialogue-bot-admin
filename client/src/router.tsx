import {
  AddIntent,
  Channels,
  FlowDetail,
  Flows,
  ForgotPassword,
  Login,
  Mail,
  Profiles,
  Register,
  SetPassword,
  Training,
  UpdateIntent,
} from '@/pages'
import { createBrowserRouter, redirect } from 'react-router-dom'

import {
  AppLayout,
  AuthLayout,
  PublishLayout,
  SettingLayout,
} from '@/components/layouts'
import { ChatBox } from 'dialogue-chatbox'
import { Suspense } from 'react'
import App from './app'
import PageLoading from './components/page-loading'
import { ROUTES } from './constants'
import i18n from './i18n'
import {
  appLoader,
  articleLoader,
  articlesLoader,
  authLoader,
  channelsLoader,
  flowDetailLoader,
  flowsLoader,
  intentLoader,
  settingLoader,
} from './lib/loader'
import Help from './pages/help'
import HelpDetail from './pages/help-detail'
import { useAppLayoutStore } from './store'

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        loader: authLoader,
        element: (
          <Suspense fallback={<PageLoading />}>
            <AuthLayout />
          </Suspense>
        ),
        children: [
          {
            path: ROUTES.AUTH.LOGIN,
            Component: Login,
            index: true,
          },
          {
            path: ROUTES.AUTH.REGISTER,
            Component: Register,
          },
          {
            path: ROUTES.AUTH.FORGOT_PASS,
            Component: ForgotPassword,
          },
          {
            path: ROUTES.AUTH.RESET_PASS,
            Component: SetPassword,
          },
        ],
      },
      {
        element: (
          <Suspense fallback={<PageLoading />}>
            <AppLayout />
          </Suspense>
        ),
        loader: appLoader,
        children: [
          {
            path: ROUTES.PRIVATE.DASHBOARD,
            index: true,
            loader: async () => {
              return redirect(ROUTES.PRIVATE.FLOW.INDEX)
            },
          },
          {
            path: ROUTES.PRIVATE.FLOW.INDEX,
            Component: Flows,
            loader: flowsLoader,
          },

          {
            path: ROUTES.PRIVATE.TRAINING.INDEX,
            Component: Training,
            loader: () => {
              useAppLayoutStore.getState().setTitle(i18n.t('common:training'))

              return null
            },
          },

          {
            path: ROUTES.PRIVATE.TRAINING.ADD_INTENT,
            Component: AddIntent,
            loader: () => {
              useAppLayoutStore.getState().setTitle(i18n.t('common:add_intent'))

              return null
            },
          },
          {
            path: `${ROUTES.PRIVATE.TRAINING.INDEX}/:id`,
            Component: UpdateIntent,
            loader: intentLoader,
          },
          {
            path: ROUTES.PRIVATE.CHANNEL.INDEX,
            Component: Channels,
            loader: channelsLoader,
          },
          {
            path: ROUTES.PRIVATE.SETTING.INDEX,
            Component: SettingLayout,
            loader: settingLoader,
            children: [
              {
                path: ROUTES.PRIVATE.SETTING.MAIL,
                Component: Mail,
              },
              {
                path: ROUTES.PRIVATE.SETTING.PROFILES,
                Component: Profiles,
              },
              {
                index: true,
                loader: async () => {
                  return redirect(ROUTES.PRIVATE.SETTING.PROFILES)
                },
              },
            ],
          },
        ],
      },
      {
        Component: PublishLayout,
        children: [
          {
            path: ROUTES.PUBLIC.LANDING_PAGE,
            element: <ChatBox />,
          },
          {
            path: ROUTES.PUBLIC.HELP,
            loader: articlesLoader,
            element: <Help />,
          },
          {
            loader: articleLoader,
            path: `${ROUTES.PUBLIC.HELP}/:slug`,
            element: <HelpDetail />,
          },
        ],
      },
      {
        loader: appLoader,
        element: (
          <Suspense fallback={<PageLoading />}>
            <AppLayout showHeader={false} />
          </Suspense>
        ),
        children: [
          {
            path: `${ROUTES.PRIVATE.FLOW.INDEX}/:id`,
            Component: FlowDetail,
            loader: flowDetailLoader,
          },
        ],
      },
    ],
  },
])
