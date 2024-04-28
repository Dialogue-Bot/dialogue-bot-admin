import { CustomChatBoxForm } from '@/components/forms'
import ChannelForm from '@/components/forms/channel'
import {
  Button,
  Confirm,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui'
import { ROUTES } from '@/constants'
import { useDeleteChannel, useUpdateChannel } from '@/hooks/channel'
import { useCustomChatBox } from '@/hooks/custom-chatbox/use-custom-chatbox'
import { useBodyOverflow } from '@/hooks/use-body-overflow'
import { queryCustomChatBoxOptions } from '@/lib/query-options/custom-chatbox'
import { TChannelWithChannelType } from '@/types/channel'
import { useQuery } from '@tanstack/react-query'
import { Row } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type Props = {
  row: Row<TChannelWithChannelType>
}

const RowActions = ({ row }: Props) => {
  const { t } = useTranslation(['common', 'channel'])
  const [openSheetUpdate, setOpenSheetUpdate] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)
  const [openSheetCustomChatBox, setOpenSheetCustomChatBox] = useState(false)
  const updateChannelMutation = useUpdateChannel()
  const deleteChannelMutation = useDeleteChannel()
  const { data: customChatBoxOptions } = useQuery(
    queryCustomChatBoxOptions(row.original.contactId),
  )
  const customChatBoxMutation = useCustomChatBox()

  useBodyOverflow(openSheetUpdate || openSheetCustomChatBox)

  return (
    <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
      <DropdownMenuTrigger>
        <Button variant='ghost' size='icon'>
          <MoreHorizontal className='w-4 h-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='max-h-svh scroll-auto'>
        <Sheet
          open={openSheetUpdate}
          onOpenChange={(value) => {
            setOpenSheetUpdate(value)

            if (!value) {
              setOpenDropdown(false)
            }
          }}
          modal
        >
          <SheetTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
              }}
            >
              {t('common:row_actions.update')}
            </DropdownMenuItem>
          </SheetTrigger>
          <SheetContent className='flex flex-col'>
            <SheetHeader>
              <SheetTitle>{t('channel:update_channel_title')}</SheetTitle>
            </SheetHeader>
            <SheetDescription>
              <Trans
                i18nKey='channel:update_channel_description'
                components={{
                  a: <Link to='/channels' className='link' />,
                }}
              />
            </SheetDescription>
            <ChannelForm
              defaultValues={{
                channelTypeId: row.original.channelTypeId,
                contactId: row.original.contactId,
                credentials: row.original.credentials
                  ? JSON.parse(row.original.credentials)
                  : undefined,
                active: row.original.active,
                contactName: row.original.contactName,
                flowId: row.original.flowId || undefined,
              }}
              onSubmit={async (data) => {
                await updateChannelMutation.mutateAsync({
                  data,
                  id: row.original.id,
                })
                setOpenSheetUpdate(false)
                setOpenDropdown(false)
              }}
              channelId={row.original.id}
              contactId={row.original.contactId}
            />
            <SheetFooter className='mt-auto'>
              <Button type='submit' form='channel-form'>
                {t('channel:update_channel')}
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        {row.original.channelType === 'Web' && (
          <Sheet
            open={openSheetCustomChatBox}
            onOpenChange={(value) => {
              setOpenSheetCustomChatBox(value)

              if (!value) {
                setOpenDropdown(false)
              }
            }}
            modal
          >
            <SheetTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                }}
              >
                {t('common:row_actions.custom_chatbox')}
              </DropdownMenuItem>
            </SheetTrigger>
            <SheetContent className='flex flex-col'>
              <SheetHeader>
                <SheetTitle>{t('channel:custom_chatbox_title')}</SheetTitle>
              </SheetHeader>
              <SheetDescription>
                <Link
                  to={`${ROUTES.PRIVATE.PREVIEW_CHATBOX}?contactId=${row.original.contactId}`}
                  className='link'
                >
                  Preview
                </Link>
              </SheetDescription>
              <CustomChatBoxForm
                channelId={row.original.id}
                onSubmit={(data) => {
                  customChatBoxMutation.mutate({
                    ...data,
                    channelId: row.original.id,
                  })
                  setOpenDropdown(false)
                  setOpenSheetCustomChatBox(false)
                }}
                defaultValues={customChatBoxOptions}
                id='custom-chatbox-form'
              />
              <SheetFooter className='mt-auto'>
                <Button type='submit' form='custom-chatbox-form'>
                  {t('common:row_actions.custom_chatbox')}
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        )}
        <Confirm
          title={t('channel:remove_channel_title')}
          description={t('channel:remove_channel_description')}
          textConfirm={t('common:remove')}
          textCancel={t('common:cancel')}
          onCancel={() => {
            setOpenDropdown(false)
          }}
          onConfirm={async () => {
            await deleteChannelMutation.mutateAsync(row.original.id)
            setOpenDropdown(false)
          }}
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
