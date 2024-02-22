import { Layout } from '@/components/layouts/auth';
import PageLoading from '@/components/page-loading';
import { useUserStore } from '@/store/use-user';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { Suspense } from 'react';

export const Route = createFileRoute('/_auth')({
   component: () => (
      <Suspense fallback={<PageLoading />}>
         <Layout />
      </Suspense>
   ),
   beforeLoad: async ({ context: _context }) => {
      const user = {};

      if (!user) {
         throw redirect({
            to: '/', // TODO: CHANGE THIS TO THE LOGIN PAGE
            search: {
               redirect: window.location.href,
            },
         });
      }

      useUserStore.getState().setUser(user);
   },
});
