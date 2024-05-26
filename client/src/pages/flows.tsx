import PageTitle from '@/components/page-title'
import { CreateFlowBtn, FlowItem } from '@/components/pages/flows'
import { Button } from '@/components/ui'
import { useDidUpdate } from '@/hooks/use-did-update'
import { usePagination } from '@/hooks/use-pagination'
import { queryFlowsOption } from '@/lib/query-options/flow'
import { TBaseQuery } from '@/types/share'
import { urlSearchParamsToObject } from '@/utils'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'

const LIMIT = 20

const Flows = () => {
  const { t } = useTranslation(['flows', 'common'])
  const [search, setSearch] = useSearchParams()

  const { data } = useSuspenseQuery(
    queryFlowsOption(urlSearchParamsToObject(search) as TBaseQuery),
  )

  const { page, handleNextPage, handlePrevPage, disabledNext, disabledPrev } =
    usePagination({
      limit: LIMIT,
      initPage: 1,
      initTotalItems: data.totalItems || 0,
    })

  useDocumentTitle(t('page_title'))

  useDidUpdate(() => {
    setSearch((prev) => {
      prev.set('page', page.toString())
      prev.set('limit', `${LIMIT}`)
      return prev
    })
  }, [page])

  return (
    <div className='p-6 space-y-4'>
      <PageTitle>{t('title')}</PageTitle>
      <div className='space-y-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          <CreateFlowBtn />
          {data.items.map((item) => {
            return <FlowItem flow={item} key={item.id} />
          })}
        </div>
        <div className='flex items-center justify-center gap-4 select-none'>
          <Button
            variant='outline'
            onClick={handlePrevPage}
            disabled={disabledPrev}
          >
            {t('common:previous')}
          </Button>
          <Button
            variant='outline'
            onClick={handleNextPage}
            disabled={disabledNext}
          >
            {t('common:next')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Flows
