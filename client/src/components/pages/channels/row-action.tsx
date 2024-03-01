import ChannelForm from '@/components/forms/channel';
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
} from '@/components/ui';
import { useDeleteChannel, useUpdateChannel } from '@/hooks/channel';
import { useBodyOverflow } from '@/hooks/use-body-overflow';
import { TChannelWithChannelType } from '@/types/channel';
import { Row } from '@tanstack/react-table';
import { Link, MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

type Props = {
   row: Row<TChannelWithChannelType>;
};

const RowActions = ({ row }: Props) => {
   const { t } = useTranslation(['common', 'channel']);
   const [open, setOpen] = useState(false);
   const [openDropdown, setOpenDropdown] = useState(false);
   const updateChannelMutation = useUpdateChannel();
   const deleteChannelMutation = useDeleteChannel();

   useBodyOverflow(open);

   return (
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
         <DropdownMenuTrigger>
            <Button variant="ghost" size="icon">
               <MoreHorizontal className="w-4 h-4" />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="start">
            <Sheet
               open={open}
               onOpenChange={(value) => {
                  setOpen(value);

                  if (!value) {
                     setOpenDropdown(false);
                  }
               }}
            >
               <SheetTrigger asChild>
                  <DropdownMenuItem
                     onSelect={(e) => {
                        e.preventDefault();
                     }}
                  >
                     {t('common:row_actions.update')}
                  </DropdownMenuItem>
               </SheetTrigger>
               <SheetContent className="flex flex-col">
                  <SheetHeader>
                     <SheetTitle>
                        {t('channel:update_channel_title')}
                     </SheetTitle>
                  </SheetHeader>
                  <SheetDescription>
                     <Trans
                        i18nKey="channel:update_channel_description"
                        components={{
                           a: <Link to="/channels" />,
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
                     }}
                     onSubmit={async (data) => {
                        await updateChannelMutation.mutateAsync({
                           data,
                           id: row.original.id,
                        });
                        setOpen(false);
                        setOpenDropdown(false);
                     }}
                  />
                  <SheetFooter className="mt-auto">
                     <Button type="submit" form="channel-form">
                        {t('channel:update_channel')}
                     </Button>
                  </SheetFooter>
               </SheetContent>
            </Sheet>
            <Confirm
               title={t('channel:remove_channel_title')}
               description={t('channel:remove_channel_description')}
               textConfirm={t('common:remove')}
               textCancel={t('common:cancel')}
               onCancel={() => {
                  setOpenDropdown(false);
               }}
               onConfirm={async () => {
                  await deleteChannelMutation.mutateAsync(row.original.id);
                  setOpenDropdown(false);
               }}
            >
               <DropdownMenuItem
                  onSelect={(e) => {
                     e.preventDefault();
                  }}
               >
                  {t('common:row_actions.delete')}
               </DropdownMenuItem>
            </Confirm>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default RowActions;
