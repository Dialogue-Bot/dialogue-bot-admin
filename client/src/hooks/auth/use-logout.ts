import { auth } from '@/apis/auth';
import { auth as fAuth } from '@/lib/firebase';
import { useUserStore } from '@/store/use-user';
import { useMutation } from '@tanstack/react-query';

export const useLogout = () => {
   const { user } = useUserStore();
   return useMutation({
      mutationFn: async () => {
         if (user?.provider !== 'local') {
            await fAuth.signOut();
         }

         await auth.logout();
      },
      async onSuccess() {
         window.location.href = '/login';
      },
      onError() {
         window.location.href = '/login';
      },
   });
};
