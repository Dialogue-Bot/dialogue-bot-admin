import ChannelForm from '@/components/forms/channel';
import {
   Button,
   Input,
   Sheet,
   SheetClose,
   SheetContent,
   SheetDescription,
   SheetFooter,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/components/ui';
import { useCreateChannel } from '@/hooks/channel';
import { useSearch } from '@/hooks/use-search';
import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type Props = {
   table: any;
};

export const DataToolbar = () => {
   const { renderInput } = useSearch();
   const { t } = useTranslation(['common', 'channel']);
   const createChannelMutation = useCreateChannel();
   const [open, setOpen] = useState(false);

   return (
      <div className="flex items-center justify-between gap-3">
         {renderInput({
            placeholder: t('common:search'),
         })}
         <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
               <Button>{t('channel:add_channel')}</Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
               <SheetHeader>
                  <SheetTitle>{t('channel:add_channel')}</SheetTitle>
               </SheetHeader>
               <SheetDescription>
                  <Trans
                     i18nKey="channel:add_channel_description"
                     components={{
                        a: <Link to="/channels" />,
                     }}
                  />
               </SheetDescription>
               <ChannelForm
                  onSubmit={async (data) => {
                     await createChannelMutation.mutateAsync(data);
                     setOpen(false);
                  }}
               />
               <SheetFooter className="mt-auto">
                  <Button
                     type="submit"
                     form="channel-form"
                     id=""
                     loading={createChannelMutation.isPending}
                  >
                     {t('channel:add_channel')}
                  </Button>
               </SheetFooter>
            </SheetContent>
         </Sheet>
      </div>
   );
};
