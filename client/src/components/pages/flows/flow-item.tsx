import FLowForm from '@/components/forms/flow'
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
  buttonVariants,
} from '@/components/ui'
import { ROUTES } from '@/constants'
import { useDeleteFlow, useUpdateFlow } from '@/hooks/flow'
import { TFLow } from '@/types/flow'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type Props = {
  flow: Pick<TFLow, 'id' | 'name' | 'publishAt'>
}

export const FlowItem = ({ flow }: Props) => {
  const { t } = useTranslation(['flows', 'common'])
  const [open, setOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)

  const updateFlowMutation = useUpdateFlow()
  const deleteFlowMutation = useDeleteFlow()

  return (
    <div className='relative w-full h-full flex min-h-48'>
      <Link
        to={`${ROUTES.PRIVATE.FLOW.INDEX}/${flow.id}`}
        className={buttonVariants({
          variant: 'outline',
          className:
            '!p-4 h-[unset] hover:border-primary hover:ring-primary hover:ring-1 flex-1',
        })}
      >
        <h3>{flow.name}</h3>
      </Link>
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenuTrigger asChild>
          <Button
            size='icon'
            variant='ghost'
            onClick={(e) => {
              e.stopPropagation()
            }}
            className=' top-2 right-2 absolute z-10'
          >
            <DotsHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Dialog
            open={open}
            onOpenChange={(value) => {
              setOpen(value)
              if (!value) {
                setOpenDropdown(false)
              }
            }}
          >
            <DialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                  setOpen(true)
                }}
              >
                {t('actions.rename')}
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('rename_dialog.title')}</DialogTitle>
                <DialogDescription>
                  {t('rename_dialog.description')}
                </DialogDescription>
              </DialogHeader>
              <FLowForm
                id='flow-form'
                defaultValues={{
                  name: flow.name,
                }}
                onSubmit={async (data) => {
                  await updateFlowMutation.mutateAsync({
                    data,
                    id: flow.id,
                  })
                  setOpen(false)
                  setOpenDropdown(false)
                }}
              />
              <DialogFooter>
                <Button
                  onClick={() => {
                    setOpen(false)
                    setOpenDropdown(false)
                  }}
                  variant='outline'
                >
                  {t('common:cancel')}
                </Button>
                <Button
                  className='ml-2'
                  form='flow-form'
                  loading={updateFlowMutation.isPending}
                >
                  {t('actions.rename')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Confirm
            title={t('remove_dialog.title')}
            description={t('remove_dialog.description')}
            onClose={() => setOpenDropdown(false)}
            onConfirm={(close) => {
              deleteFlowMutation.mutate(flow.id)
              close()
            }}
            isLoading={deleteFlowMutation.isPending}
          >
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
              }}
            >
              {t('actions.remove')}
            </DropdownMenuItem>
          </Confirm>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
