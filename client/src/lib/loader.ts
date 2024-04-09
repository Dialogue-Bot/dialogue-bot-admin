import { ROUTES } from '@/constants'
import i18n from '@/i18n'
import { useAppLayoutStore, useSettingStore, useUserStore } from '@/store'
import { TChannelQuery } from '@/types/channel'
import { TBaseQuery } from '@/types/share'
import { queryStringToObject } from '@/utils'
import { createId } from '@paralleldrive/cuid2'
import { redirect } from 'react-router-dom'
import { getAllArticles, getArticle } from './content'
import { queryClient } from './query-client'
import {
  currentUserQueryOptions,
  queryChannelForTestOption,
  queryChannelsForSelectOption,
  queryChannelsOption,
  queryFlowDetailOption,
  queryFlowsOption,
  queryIntentOption,
  queryIntentsOption,
  settingQueryOption,
} from './query-options'

export const authLoader = async ({ request }: any) => {
  const redirectUrl = new URL(request.url).searchParams.get('redirect')
  const user = await queryClient.ensureQueryData(currentUserQueryOptions())

  if (user) {
    return redirect(
      redirectUrl ? encodeURIComponent(redirectUrl) : ROUTES.PRIVATE.FLOW.INDEX,
    )
  }

  return null
}

export const appLoader = async () => {
  const user = await queryClient.ensureQueryData(currentUserQueryOptions())

  const url = new URLSearchParams({
    redirect: location.href,
  })

  if (!user) {
    return redirect(
      `${ROUTES.AUTH.LOGIN}?${encodeURIComponent(url.toString())}`,
    )
  }

  useUserStore.getState().setUser(user)

  return null
}

export const channelsLoader = async ({ request }: any) => {
  const query: TChannelQuery = queryStringToObject(request.url)

  await queryClient.ensureQueryData(queryChannelsOption(query))

  useAppLayoutStore.getState().setTitle(i18n.t('common:channels'))

  return null
}

export const settingLoader = async () => {
  const data = await queryClient.ensureQueryData(settingQueryOption())

  useSettingStore.getState().setSetting(data)
  useAppLayoutStore.getState().setTitle(i18n.t('common:settings'))

  return null
}

export const articlesLoader = async ({ request }: any) => {
  const query = queryStringToObject(request.url)
  const articles = await getAllArticles(query)

  return {
    articles,
  }
}

export const articleLoader = async ({ params }: any) => {
  const { article, next, prev } = await getArticle(params.slug)

  if (!article) {
    return redirect('/404')
  }

  return {
    article,
    next,
    prev,
  }
}

export const flowsLoader = async ({ request }: any) => {
  const query: TBaseQuery = queryStringToObject(request.url)

  await queryClient.ensureQueryData(queryFlowsOption(query))

  useAppLayoutStore.getState().setTitle(i18n.t('common:chatbots'))

  return null
}

export const flowDetailLoader = async ({ params }: any) => {
  await Promise.all([
    queryClient.ensureQueryData(queryChannelsForSelectOption(params.id)),
    queryClient.ensureQueryData(queryFlowDetailOption(params.id)),
    queryClient.ensureQueryData(queryChannelForTestOption(params.id)),
  ])

  localStorage.setItem('user-bot-id', createId())

  return null
}

export const intentsLoader = async ({ request }: any) => {
  const query: TBaseQuery = queryStringToObject(request.url)

  await queryClient.ensureQueryData(queryIntentsOption(query))

  useAppLayoutStore.getState().setTitle(i18n.t('common:training'))

  return null
}

export const intentLoader = async ({ params }: any) => {
  const intent = await queryClient.ensureQueryData(queryIntentOption(params.id))
  return intent
}
