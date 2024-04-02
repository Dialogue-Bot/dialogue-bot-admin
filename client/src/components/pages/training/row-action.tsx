import {
  Button,
  Confirm,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'
import { ROUTES } from '@/constants'
import { useDeleteIntent } from '@/hooks/intent'
import { TIntent } from '@/types/intent'
import { Row } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type Props = {
  row: Row<TIntent>
}

const RowActions = ({ row }: Props) => {
  const { t } = useTranslation(['common', 'training'])
  const [openDropdown, setOpenDropdown] = useState(false)
  const deleteIntentMutation = useDeleteIntent()

  return (
    <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
      <DropdownMenuTrigger>
        <Button variant='ghost' size='icon'>
          <MoreHorizontal className='w-4 h-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='max-h-svh scroll-auto'>
        <DropdownMenuItem asChild>
          <Link to={`${ROUTES.PRIVATE.TRAINING.INDEX}/${row.original.id}`}>
            {t('common:row_actions.update')}
          </Link>
        </DropdownMenuItem>
        <Confirm
          title={t('training:remove_intent_title')}
          description={t('training:remove_intent_description')}
          textConfirm={t('common:remove')}
          textCancel={t('common:cancel')}
          onCancel={() => {
            setOpenDropdown(false)
          }}
          onConfirm={async (close) => {
            await deleteIntentMutation.mutateAsync(row.original.id)
            close?.()
          }}
          isLoading={deleteIntentMutation.isPending}
        >
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault()
            }}
          >
            {t('common:row_actions.delete')}
          </DropdownMenuItem>
        </Confirm>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default RowActions
