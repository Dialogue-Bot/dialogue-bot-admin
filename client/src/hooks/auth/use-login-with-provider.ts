import { auth } from '@/apis/auth';
import { auth as fAuth } from '@/lib/firebase';
import { useMutation } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { AuthProvider, getIdToken, signInWithPopup } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export const useLoginWithProvider = (provider: AuthProvider) => {
   const { t } = useTranslation('common');
   const search = useSearch({
      from: '/_auth/login',
   });

   return useMutation({
      mutationFn: async () => {
         const user = await signInWithPopup(fAuth, provider);

         const idToken = await getIdToken(user.user);

         return auth.loginWithIdToken(idToken);
      },
      async onSuccess() {
         window.location.href = search.redirect || '/dashboard';
      },
      onError(err: any) {
         console.log(err);
         toast.error(err?.response?.data?.message || t('api_error'));
      },
   });
};
