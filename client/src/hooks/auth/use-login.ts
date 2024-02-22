import { auth } from '@/apis/auth';
import { TLogin } from '@/lib/schema/login';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export const useLogin = () => {
   const { t } = useTranslation('common');
   return useMutation({
      mutationFn: (data: TLogin) => {
         return auth.login(data);
      },
      onSuccess(data) {
         toast.success(data.message);
      },
      onError(err: any) {
         toast.error(err?.response?.data?.message || t('api_error'));
      },
   });
};
