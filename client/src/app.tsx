import { createBrowserRouter, redirect } from 'react-router-dom';
import { queryClient } from '@/lib/query-client';
import i18n from './i18n';
import {
   Channels,
   ForgotPassword,
   Login,
   Mail,
   Profiles,
   Register,
   SetPassword,
} from '@/pages';
import { useAppLayoutStore, useSettingStore, useUserStore } from '@/store';
import {
   currentUserQueryOptions,
   settingQueryOption,
} from '@/lib/query-options';
import { AppLayout, AuthLayout, SettingLayout } from '@/components/layouts';
import { TChannelQuery } from './types/channel';
import { queryStringToObject } from './utils';
import { queryChannelsOption } from './lib/query-options/channel';
import { ROUTES } from './constants';

export const router = createBrowserRouter([
   {
      children: [
         {
            loader: async ({ request }) => {
               const redirectUrl = new URL(request.url).searchParams.get(
                  'redirect'
               );
               const user = await queryClient.ensureQueryData(
                  currentUserQueryOptions()
               );

               if (user) {
                  return redirect(redirectUrl || '/chatbots');
               }

               return null;
            },
            Component: AuthLayout,
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
            Component: AppLayout,
            loader: async () => {
               const user = await queryClient.ensureQueryData(
                  currentUserQueryOptions()
               );

               const url = new URLSearchParams({
                  redirect: location.href,
               });

               if (!user) {
                  return redirect(`${ROUTES.AUTH.LOGIN}?${url.toString()}`);
               }

               useUserStore.getState().setUser(user);

               return null;
            },
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
                  element: <div>a</div>,
                  loader: () => {
                     useAppLayoutStore
                        .getState()
                        .setTitle(i18n.t('common:chatbots'));

                     return null;
                  },
               },
               {
                  path: ROUTES.PRIVATE.CHANNEL.INDEX,
                  Component: Channels,
                  loader: async ({ request }) => {
                     const query: TChannelQuery = queryStringToObject(
                        request.url
                     );

                     await queryClient.ensureQueryData(
                        queryChannelsOption(query)
                     );

                     useAppLayoutStore
                        .getState()
                        .setTitle(i18n.t('common:channels'));

                     return null;
                  },
               },
               {
                  path: ROUTES.PRIVATE.SETTING.INDEX,
                  Component: SettingLayout,
                  loader: async () => {
                     const data =
                        await queryClient.ensureQueryData(settingQueryOption());

                     useSettingStore.getState().setSetting(data);
                     useAppLayoutStore
                        .getState()
                        .setTitle(i18n.t('common:settings'));

                     return null;
                  },
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
            path: ROUTES.PUBLIC.LANDING_PAGE,
            element: <div>Hi</div>,
         },
      ],
   },
]);
