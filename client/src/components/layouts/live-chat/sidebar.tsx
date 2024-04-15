import PageTitle from '@/components/page-title'
import { ConversationItem } from '@/components/pages/live-chat'
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { NOT_CHOOSE } from '@/constants'
import { usePagination } from '@/hooks/use-pagination'
import { queryChannelsForSelectOption } from '@/lib/query-options'
import { queryConversationsOptions } from '@/lib/query-options/live-chat'
import { urlSearchParamsToObject } from '@/utils'
import { useSuspenseQuery } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

const LIMIT = 10

const Sidebar = () => {
  const { t } = useTranslation('conversations')
  const [search, setSearch] = useSearchParams()

  const searchParams = urlSearchParamsToObject(search)

  const { data } = useSuspenseQuery(
    queryConversationsOptions(
      search.get('channelId') === NOT_CHOOSE
        ? omit(searchParams, 'channelId')
        : searchParams,
    ),
  )

  const { disabledNext, disabledPrev, handleNextPage, handlePrevPage } =
    usePagination({
      initPage: 1,
      limit: LIMIT,
      initTotalItems: data.totalItems || 0,
    })

  const { data: channels } = useSuspenseQuery(queryChannelsForSelectOption())

  return (
    <aside className='max-w-80 w-full border-r border-input'>
      <div className='h-header flex items-center px-4 border-b border-input'>
        <PageTitle>{t('title')}</PageTitle>
      </div>
      <div className='p-4 pb-0'>
        <Select
          value={search.get('channelId') || NOT_CHOOSE}
          onValueChange={(value) => {
            setSearch({ channelId: value })
          }}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder={t('filter')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={NOT_CHOOSE}>{t('filter_all')}</SelectItem>
            {channels.map((item) => {
              return (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>
      <div>
        {data.items.length > 0 ? (
          <ul>
            {data.items.map((item) => {
              return (
                <li key={`${item.userId}-${item.channelId}`}>
                  <ConversationItem conversation={item} />
                </li>
              )
            })}
          </ul>
        ) : (
          <div className='p-4 flex items-center justify-center'>
            <p className='text-muted-foreground'>{t('empty_conversation')}</p>
          </div>
        )}
      </div>
      {data.totalItems >= LIMIT && (
        <div className='flex items-center justify-center gap-4 select-none'>
          <Button
            variant='outline'
            onClick={handlePrevPage}
            disabled={disabledPrev}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            onClick={handleNextPage}
            disabled={disabledNext}
          >
            Next
          </Button>
        </div>
      )}
    </aside>
  )
}

export default Sidebar
