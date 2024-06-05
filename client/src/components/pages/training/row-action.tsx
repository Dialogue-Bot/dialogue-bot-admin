import TestIntentForm from '@/components/forms/test-intent'
import {
  Button,
  Confirm,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'
import { ROUTES } from '@/constants'
import { useDeleteIntent, useTestIntent } from '@/hooks/intent'
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
  const [openDialog, setOpenDialog] = useState(false)
  const deleteIntentMutation = useDeleteIntent()
  const testIntentMutation = useTestIntent()

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
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
              }}
            >
              {t('common:row_actions.test_train')}
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('training:test_title')}</DialogTitle>
              <DialogDescription>
                {t('training:test_description')}
              </DialogDescription>
            </DialogHeader>
            <TestIntentForm
              defaultValues={{
                text: '',
                referenceId: row.original.referenceId,
              }}
              onSubmit={async (data) => {
                await testIntentMutation.mutateAsync(data)
                setOpenDialog(false)
              }}
            />
            <DialogFooter>
              <Button
                variant='outline'
                onClick={() => {
                  setOpenDialog(false)
                  setOpenDropdown(false)
                }}
                disabled={testIntentMutation.isPending}
              >
                {t('common:cancel')}
              </Button>
              <Button
                form='test-intent-form'
                type='submit'
                loading={testIntentMutation.isPending}
              >
                {t('common:submit')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
