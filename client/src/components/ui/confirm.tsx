import { useState } from 'react';
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from './alert-dialog';
import { useTranslation } from 'react-i18next';

export type ConfirmProps = {
   onConfirm?: (close: () => void) => void;
   onCancel?: () => void;
   children: React.ReactNode;
   textConfirm?: string;
   textCancel?: string;
   description?: string;
   title?: string;
   isLoading?: boolean;
   onClose?: () => void;
};

export function Confirm({
   children,
   onCancel,
   onConfirm,
   textCancel,
   textConfirm,
   description,
   title,
   isLoading,
   onClose,
}: ConfirmProps) {
   const [isOpen, setIsOpen] = useState(false);
   const { t } = useTranslation('common');

   return (
      <AlertDialog
         onOpenChange={(value) => {
            setIsOpen(value);
            if (!value) {
               onClose?.();
            }
         }}
         open={isOpen}
      >
         <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>
                  {title ? title : t('dialog_confirm_title')}
               </AlertDialogTitle>
               {description ? (
                  <AlertDialogDescription>{description}</AlertDialogDescription>
               ) : null}
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel
                  disabled={isLoading}
                  onClick={() => {
                     setIsOpen(false);
                     onCancel?.();
                  }}
               >
                  {textCancel ? textCancel : t('cancel')}
               </AlertDialogCancel>
               <AlertDialogAction
                  isLoading={isLoading}
                  onClick={() => {
                     onConfirm?.(() => {
                        setIsOpen(false);
                     });
                  }}
               >
                  {textConfirm ? textConfirm : t('confirm')}
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
