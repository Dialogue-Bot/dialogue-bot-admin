import { Layout } from '@/components/layouts/app';
import PageLoading from '@/components/page-loading';
import { currentUserQueryOptions } from '@/lib/query-options/auth';
import { useUserStore } from '@/store/use-user';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { Suspense } from 'react';

export const Route = createFileRoute('/_private')({
   component: () => (
      <Suspense fallback={<PageLoading />}>
         <Layout />
      </Suspense>
   ),
   beforeLoad: async ({ context: _context }) => {
      const user = await _context.queryClient.ensureQueryData(
         currentUserQueryOptions()
      );

      if (!user) {
         throw redirect({
            to: '/login',
            search: {
               redirect: location.href,
            },
         });
      }

      useUserStore.getState().setUser(user);
   },
});
