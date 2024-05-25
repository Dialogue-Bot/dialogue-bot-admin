import { Checkbox, DataTableColumnHeader } from '@/components/ui'
import { cn } from '@/lib/utils'
import { TChannelWithChannelType } from '@/types/channel'
import { formatDate } from '@/utils'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import RowActions from './row-action'

export const useCols = () => {
  const { t } = useTranslation('tableCols')

  const cols = useMemo<ColumnDef<TChannelWithChannelType>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label='Select all'
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label='Select row'
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('contact_id')} />
        ),
        id: 'contactId',
        accessorKey: 'contactId',
        enableSorting: true,
        enableHiding: true,
      },
      {
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('contact_name')} />
        ),
        id: 'contactName',
        accessorKey: 'contactName',
        enableSorting: true,
        enableHiding: true,
      },
      {
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('channel_type')} />
        ),
        id: 'channelType',
        accessorKey: 'channelType',
        enableSorting: true,
        enableHiding: true,
      },
      {
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('active')} />
        ),
        id: 'active',
        accessorKey: 'active',
        enableSorting: true,
        enableHiding: true,
        cell: ({ row }) => (
          <span className='relative flex h-2 w-2'>
            <span
              className={cn(
                'absolute inline-flex h-full w-full rounded-full  opacity-75 bg-orange-500',
                {
                  'bg-green-500 animate-ping': row.original.active,
                },
              )}
            />
            <span
              className={cn(
                'relative inline-flex rounded-full h-2 w-2 bg-orange-500',
                {
                  'bg-green-500': row.original.active,
                },
              )}
            />
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
