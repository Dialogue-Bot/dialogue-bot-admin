import PageTitle from '@/components/page-title'
import { ConversationItem } from '@/components/pages/live-chat'
import { queryConversationsOptions } from '@/lib/query-options/live-chat'
import { TConversationLiveChatQuery } from '@/types/live-chat'
import { urlSearchParamsToObject } from '@/utils'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

const Sidebar = () => {
  const { t } = useTranslation('conversations')
  const [search] = useSearchParams()
  const { data } = useSuspenseQuery(
    queryConversationsOptions(
      urlSearchParamsToObject(search) as TConversationLiveChatQuery,
    ),
  )
  return (
    <aside className='max-w-80 w-full border-r border-input'>
      <div className='h-header flex items-center px-4 border-b border-input'>
        <PageTitle>{t('title')}</PageTitle>
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
    </aside>
  )
}

export default Sidebar
