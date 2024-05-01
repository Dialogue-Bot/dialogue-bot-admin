import {
  AppLayout,
  AuthLayout,
  LiveChatLayout,
  PublishLayout,
  SettingLayout,
} from '@/components/layouts'
import {
  AddIntent,
  Channels,
  CheckoutSuccess,
  ConversationDetail,
  Conversations,
  FlowDetail,
  Flows,
  ForgotPassword,
  LandingPage,
  Login,
  Mail,
  PreviewChatBox,
  Profiles,
  Register,
  RequestVerifyAccount,
  SetPassword,
  Training,
  UpdateIntent,
  UserSubscriptions,
  VerifyAccount,
} from '@/pages'
import { Suspense } from 'react'
import { createBrowserRouter, redirect } from 'react-router-dom'
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
  conversationsLoader,
  flowDetailLoader,
  flowsLoader,
  intentLoader,
  ladingPageLoader,
  previewChatBoxLoader,
  settingLoader,
  userSubscriptionLoader,
  verifyAccountLoader,
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
          {
            path: ROUTES.AUTH.REQUEST_VERIFY_ACCOUNT,
            Component: RequestVerifyAccount,
          },
          {
            path: ROUTES.AUTH.VERIFY_ACCOUNT,
            Component: VerifyAccount,
            loader: verifyAccountLoader,
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
            path: ROUTES.PRIVATE.USER_SUBSCRIPTION.INDEX,
            Component: UserSubscriptions,
            loader: userSubscriptionLoader,
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
          {
            path: ROUTES.PRIVATE.CONVERSATION.INDEX,
            Component: LiveChatLayout,
            children: [
              {
                index: true,
                Component: Conversations,
                loader: conversationsLoader,
              },
              {
                path: `${ROUTES.PRIVATE.CONVERSATION.INDEX}/:userId/:channelId`,
                Component: ConversationDetail,
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
            Component: LandingPage,
            loader: ladingPageLoader,
          },
          {
            path: ROUTES.PUBLIC.CHECKOUT_SUCCESS,
            Component: CheckoutSuccess,
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
      {
        path: ROUTES.PRIVATE.PREVIEW_CHATBOX,
        loader: previewChatBoxLoader,
        Component: PreviewChatBox,
      },
    ],
  },
])
