import { auth } from '@/apis/auth';
import { auth as fAuth } from '@/lib/firebase';
import { useMutation } from '@tanstack/react-query';
import { AuthProvider, getIdToken, signInWithPopup } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export const useLoginWithProvider = (provider: AuthProvider) => {
   const { t } = useTranslation('common');
   return useMutation({
      mutationFn: async () => {
         const user = await signInWithPopup(fAuth, provider);

         const idToken = await getIdToken(user.user);

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
