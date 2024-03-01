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
                  path: '/login',
                  Component: Login,
                  index: true,
               },
               {
                  path: '/register',
                  Component: Register,
               },
               {
                  path: '/forgot-password',
                  Component: ForgotPassword,
               },
               {
                  path: '/set-password',
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
                  return redirect(`/login?${url.toString()}`);
               }

               useUserStore.getState().setUser(user);

               return null;
            },
            children: [
               {
                  path: '/dashboard',
                  index: true,
                  loader: async () => {
                     return redirect('/chatbots');
                  },
               },
               {
                  path: '/chatbots',
                  element: <div>a</div>,
                  loader: () => {
                     useAppLayoutStore
                        .getState()
                        .setTitle(i18n.t('common:chatbots'));

                     return null;
                  },
               },
               {
                  path: '/channels',
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
                  path: '/settings',
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
                        path: 'mail',
                        Component: Mail,
                     },
                     {
                        path: 'profiles',
                        Component: Profiles,
                     },
                     {
                        index: true,
                        loader: async () => {
                           return redirect('/settings/profiles');
                        },
                     },
                  ],
               },
            ],
         },
         {
            path: '/',
            element: <div>Hi</div>,
         },
      ],
   },
]);
