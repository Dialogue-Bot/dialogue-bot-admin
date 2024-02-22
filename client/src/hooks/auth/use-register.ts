import { auth } from '@/apis/auth';
import { TRegister } from '@/lib/schema/register';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export const useRegister = () => {
   const { t } = useTranslation('common');
   return useMutation({
      mutationFn: (data: TRegister) => {
         return auth.register(data);
      },
      onSuccess(data) {
         toast.success(data.message);
      },
      onError(err: any) {
         toast.error(err?.response?.data?.message || t('api_error'));
      },
   });
};
