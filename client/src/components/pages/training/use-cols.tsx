import { DataTableColumnHeader } from '@/components/ui'
import { TIntent } from '@/types/intent'
import { formatDate } from '@/utils'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import RowActions from './row-action'

export const useCols = () => {
  const { t } = useTranslation(['tableCols', 'common'])

  const cols = useMemo<ColumnDef<TIntent>[]>(
    () => [
      {
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('name')} />
        ),
        id: 'name',
        accessorKey: 'name',
        enableSorting: true,
        enableHiding: true,
      },

      {
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('trained')} />
        ),
        id: 'trained',
        accessorKey: 'trained',
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => (
          <span>
            {row.original.trained
              ? t('common:trained')
              : t('common:not_trained')}
          </span>
        ),
      },

      {
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('created_at')} />
        ),
        id: 'createdAt',
        accessorKey: 'createdAt',
        enableSorting: true,
        enableHiding: true,
        cell: ({ row }) => <span>{formatDate(row.original.createdAt)}</span>,
      },
      {
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('updated_at')} />
        ),
        id: 'updatedAt',
        accessorKey: 'updatedAt',
        enableSorting: true,
        enableHiding: true,
        cell: ({ row }) => (
          <span>
            {formatDate(row.original.updatedAt || row.original.createdAt)}
          </span>
        ),
      },

      {
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('actions')} />
        ),
        cell: ({ row }) => {
          return <RowActions row={row} />
        },
        id: 'actions',
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [t],
  )

  return cols
}
