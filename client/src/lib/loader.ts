import { redirect } from 'react-router-dom';
import { queryClient } from './query-client';
import { currentUserQueryOptions, settingQueryOption } from './query-options';
import { ROUTES } from '@/constants';
import { useAppLayoutStore, useSettingStore, useUserStore } from '@/store';
import { TChannelQuery } from '@/types/channel';
import { queryStringToObject } from '@/utils';
import { queryChannelsOption } from './query-options/channel';
import i18n from '@/i18n';
import { getAllArticles, getArticle } from './content';

export const authLoader = async ({ request }: any) => {
   const redirectUrl = new URL(request.url).searchParams.get('redirect');
   const user = await queryClient.ensureQueryData(currentUserQueryOptions());

   if (user) {
      return redirect(redirectUrl || '/chatbots');
   }

   return null;
};

export const appLoader = async () => {
   const user = await queryClient.ensureQueryData(currentUserQueryOptions());

   const url = new URLSearchParams({
      redirect: location.href,
   });

   if (!user) {
      return redirect(`${ROUTES.AUTH.LOGIN}?${url.toString()}`);
   }

   useUserStore.getState().setUser(user);

   return null;
};

export const channelsLoader = async ({ request }: any) => {
   const query: TChannelQuery = queryStringToObject(request.url);

   await queryClient.ensureQueryData(queryChannelsOption(query));

   useAppLayoutStore.getState().setTitle(i18n.t('common:channels'));

   return null;
};

export const settingLoader = async () => {
   const data = await queryClient.ensureQueryData(settingQueryOption());

   useSettingStore.getState().setSetting(data);
   useAppLayoutStore.getState().setTitle(i18n.t('common:settings'));

   return null;
};

export const articlesLoader = async ({ request }: any) => {
   const query = queryStringToObject(request.url);
   const articles = await getAllArticles(query);

   return {
      articles,
   };
};

export const articleLoader = async ({ params }: any) => {
   const { article, next, prev } = await getArticle(params.slug);

   if (!article) {
      return redirect('/404');
   }

   return {
      article,
      next,
      prev,
   };
};
