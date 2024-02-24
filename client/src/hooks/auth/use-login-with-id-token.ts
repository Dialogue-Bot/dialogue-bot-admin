import { auth } from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export const useLoginWithIdToken = () => {
   const { t } = useTranslation('common');
   return useMutation({
      mutationFn: (idToken: string) => {
         return auth.loginWithIdToken(idToken);
      },
      onSuccess(data) {
         toast.success(data.message);
      },
      onError(err: any) {
         toast.error(err?.response?.data?.message || t('api_error'));
      },
   });
};
