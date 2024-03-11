import { settingApi } from '@/apis/setting'
import { useUserStore } from '@/store/use-user'
import { queryOptions } from '@tanstack/react-query'

export const settingQueryOption = () =>
  queryOptions({
    queryKey: ['setting', useUserStore.getState().user?.id],
    queryFn: () => settingApi.getSetting().then((res) => res.data),
  })
