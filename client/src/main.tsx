import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';
import './index.css';
import { SToaster } from '@/components/ui';
import { useUserStore } from './store/use-user';
import './i18n';

export const queryClient = new QueryClient();

const router = createRouter({
   routeTree,
   context: {
      queryClient,
      user: useUserStore.getState().user,
   },
   defaultPreload: 'intent',
   defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
   interface Register {
      router: typeof router;
   }
}

const rootElement = document.getElementById('root')!;

if (!rootElement?.innerHTML) {
   const root = createRoot(rootElement);
   root.render(
      <>
         <QueryClientProvider client={queryClient}>
            <SToaster />
            <RouterProvider defaultPreload="intent" router={router} />
         </QueryClientProvider>
      </>
   );
}
