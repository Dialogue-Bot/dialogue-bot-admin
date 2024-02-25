import { auth } from '@/apis/auth';
import { TLogin } from '@/lib/schema/login';
import { useMutation } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export const useLogin = () => {
   const { t } = useTranslation('common');
   const search = useSearch({
      from: '/_auth/login',
   });

   return useMutation({
      mutationFn: (data: TLogin) => {
         return auth.login(data);
      },
      onSuccess(data) {
         toast.success(data.message);

         window.location.href = search.redirect || '/dashboard';
      },
      onError(err: any) {
         console.log(err);
         toast.error(err?.response?.data?.message || t('api_error'));
      },
   });
};
