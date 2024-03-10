import { createBrowserRouter, redirect } from 'react-router-dom';
import i18n from './i18n';
import {
   Channels,
   ChatBotDetail,
   Chatbots,
   ForgotPassword,
   Login,
   Mail,
   Profiles,
   Register,
   SetPassword,
} from '@/pages';
import { useAppLayoutStore } from '@/store';

import {
   AppLayout,
   AuthLayout,
   PublishLayout,
   SettingLayout,
} from '@/components/layouts';
import { ROUTES } from './constants';
import Help from './pages/help';
import { Suspense } from 'react';
import PageLoading from './components/page-loading';
import {
   appLoader,
   articleLoader,
   articlesLoader,
   authLoader,
   channelsLoader,
   flowsLoader,
   settingLoader,
} from './lib/loader';
import HelpDetail from './pages/help-detail';

export const router = createBrowserRouter([
   {
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
                     return redirect(ROUTES.PRIVATE.CHAT_BOT.INDEX);
                  },
               },
               {
                  path: ROUTES.PRIVATE.CHAT_BOT.INDEX,
                  Component: Chatbots,
                  loader: flowsLoader,
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
                           return redirect(ROUTES.PRIVATE.SETTING.PROFILES);
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
                  element: <div>Hi</div>,
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
                  path: `${ROUTES.PRIVATE.CHAT_BOT.INDEX}/:id`,
                  Component: ChatBotDetail,
               },
            ],
         },
      ],
   },
]);
