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

export type ConfirmProps = {
   onConfirm?: (close: () => void) => void;
   onCancel?: () => void;
   children: React.ReactNode;
   textConfirm?: string;
   textCancel?: string;
   description?: string;
   title?: string;
   isLoading?: boolean;
};

export function Confirm({
   children,
   onCancel,
   onConfirm,
   textCancel = 'Huỷ bỏ',
   textConfirm = 'Xác nhận',
   description,
   title = 'Bạn có chắc chắn?',
   isLoading,
}: ConfirmProps) {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <AlertDialog onOpenChange={setIsOpen} open={isOpen}>
         <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>{title}</AlertDialogTitle>
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
                  {textCancel}
               </AlertDialogCancel>
               <AlertDialogAction
                  isLoading={isLoading}
                  onClick={() => {
                     onConfirm?.(() => {
                        setIsOpen(false);
                     });
                  }}
               >
                  {textConfirm}
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
