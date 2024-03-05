import ChannelForm from '@/components/forms/channel';
import {
   Button,
   Sheet,
   SheetContent,
   SheetDescription,
   SheetFooter,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/components/ui';
import { useCreateChannel } from '@/hooks/channel';
import { useSearch } from '@/hooks/use-search';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

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
                        a: <Link to="/channels" className="link" />,
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
