import ChannelForm from '@/components/forms/channel'
import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui'
import { useCreateChannel } from '@/hooks/channel'
import { useSearch } from '@/hooks/use-search'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const DataToolbar = () => {
  const { renderInput } = useSearch()
  const { t } = useTranslation(['common', 'channel'])
  const createChannelMutation = useCreateChannel()
  const [open, setOpen] = useState(false)

  return (
    <div className='flex items-center justify-between gap-3 sm:flex-row flex-col'>
      {renderInput({
        placeholder: t('common:search'),
        className: 'w-full sm:max-w-64 max-w-full',
      })}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className='w-full sm:w-auto'>
            {t('channel:add_channel')}
          </Button>
        </SheetTrigger>
        <SheetContent className='flex flex-col'>
          <SheetHeader>
            <SheetTitle>{t('channel:add_channel')}</SheetTitle>
            <SheetDescription>
              <Trans
                i18nKey='channel:add_channel_description'
                components={{
                  a: <Link to='/channels' className='link' />,
                }}
              />
            </SheetDescription>
          </SheetHeader>
          <ChannelForm
            onSubmit={async (data) => {
              await createChannelMutation.mutateAsync(data)
              setOpen(false)
            }}
          />
          <SheetFooter className='mt-auto'>
            <Button
              type='submit'
              form='channel-form'
              id=''
              loading={createChannelMutation.isPending}
            >
              {t('channel:add_channel')}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
