import { Layout } from '@/components/layouts/auth';
import PageLoading from '@/components/page-loading';
import { currentUserQueryOptions } from '@/lib/query-options/auth';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { Suspense } from 'react';

export const Route = createFileRoute('/_auth')({
   component: () => (
      <Suspense fallback={<PageLoading />}>
         <Layout />
      </Suspense>
   ),
   beforeLoad: async ({ context: _context }) => {
      const user = await _context.queryClient.ensureQueryData(
         currentUserQueryOptions()
      );

      if (user) {
         throw redirect({
            to: '/chatbots',
         });
      }
   },
});
