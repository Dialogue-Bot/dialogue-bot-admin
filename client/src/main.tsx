import { SToaster } from '@/components/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';
import './i18n';
import './index.css';
import { routeTree } from './routeTree.gen';
import { useUserStore } from './store/use-user';

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
            <SToaster position="top-center" />
            <RouterProvider defaultPreload="intent" router={router} />
         </QueryClientProvider>
      </>
   );
}
