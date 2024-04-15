import PageTitle from '@/components/page-title'
import { DataToolbar, useCols } from '@/components/pages/channels'
import { DataTable } from '@/components/ui'
import { useDeleteManyChannel } from '@/hooks/channel'
import { usePaginate } from '@/hooks/use-pagniate'
import { useSorting } from '@/hooks/use-sorting'
import { queryChannelsOption } from '@/lib/query-options/channel'
import { TChannelQuery } from '@/types/channel'
import { calcPageCount, urlSearchParamsToObject } from '@/utils'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getSortedRowModel } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'

const Channels = () => {
  const { t } = useTranslation('channel')
  const [search] = useSearchParams()

  const { setSorting, sorting } = useSorting()
  const { pagination, setPagination } = usePaginate()

  const cols = useCols()

  const { data } = useSuspenseQuery(
    queryChannelsOption(urlSearchParamsToObject(search) as TChannelQuery),
  )

  const deleteManyChannelMutation = useDeleteManyChannel()

  useDocumentTitle(t('page_title'))

  return (
    <div className='p-6 space-y-4'>
      <PageTitle>{t('title')}</PageTitle>
      <div>
        <DataTable
          columns={cols}
          data={data.items || []}
          renderToolbar={() => <DataToolbar />}
          opts={{
            state: {
              sorting,
              pagination,
            },
            manualPagination: true,
            enableSorting: true,
            manualSorting: true,
            onSortingChange: setSorting,
            onPaginationChange: setPagination,
            getSortedRowModel: getSortedRowModel(),
            pageCount: calcPageCount(data.totalItems || 0, pagination.pageSize),
          }}
          isLoadingDelete={deleteManyChannelMutation.isPending}
          onDeleteRowSelected={async (rows, close) => {
            await deleteManyChannelMutation.mutateAsync(rows)
            close?.()
          }}
        />
      </div>
    </div>
  )
}

export default Channels
