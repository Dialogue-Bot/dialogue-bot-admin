import PageTitle from '@/components/page-title'
import { DataToolbar, useCols } from '@/components/pages/training'
import { DataTable } from '@/components/ui'
import { usePaginate } from '@/hooks/use-pagniate'
import { useSorting } from '@/hooks/use-sorting'
import { queryIntentsOption } from '@/lib/query-options'
import { calcPageCount, urlSearchParamsToObject } from '@/utils'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getSortedRowModel } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'

const Training = () => {
  const { t } = useTranslation('training')
  const [search] = useSearchParams()

  const { setSorting, sorting } = useSorting()
  const { pagination, setPagination } = usePaginate()

  const cols = useCols()

  const { data } = useSuspenseQuery(
    queryIntentsOption(urlSearchParamsToObject(search)),
  )

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
        />
      </div>
    </div>
  )
}

export default Training
