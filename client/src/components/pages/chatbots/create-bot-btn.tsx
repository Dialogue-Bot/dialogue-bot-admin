import FLowForm from '@/components/forms/flow';
import {
   Button,
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui';
import { useCreateFlow } from '@/hooks/flow';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Renders a button component for creating a bot.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onCreate - The callback function to be called when the button is clicked.
 * @returns {JSX.Element} The rendered button component.
 */
export const CreateFlowBtn = () => {
   const { t } = useTranslation(['chatbots', 'common']);
   const [open, setOpen] = useState(false);
   const createFlowMutation = useCreateFlow();
   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button className="min-h-48 flex flex-col py-4">
               <Plus />
               <span>{t('create_btn')}</span>
            </Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>{t('create_dialog.title')}</DialogTitle>
               <DialogDescription>
                  {t('create_dialog.description')}
               </DialogDescription>
            </DialogHeader>
            <FLowForm
               id="flow-form"
               onSubmit={async (data) => {
                  createFlowMutation.mutateAsync(data);
                  setOpen(false);
               }}
            />
            <DialogFooter>
               <Button
                  onClick={() => {
                     setOpen(false);
                  }}
                  variant="outline"
               >
                  {t('common:cancel')}
               </Button>
               <Button form="flow-form" loading={createFlowMutation.isPending}>
                  {t('common:submit')}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};
