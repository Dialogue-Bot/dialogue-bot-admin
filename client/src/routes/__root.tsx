import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import React, { Suspense } from 'react';

const TanStackRouterDevtools =
   process.env.NODE_ENV === 'production'
      ? () => null
      : React.lazy(() =>
           import('@tanstack/router-devtools').then((res) => ({
              default: res.TanStackRouterDevtools,
           }))
        );

const ReactQueryDevtools =
   process.env.NODE_ENV === 'production'
      ? () => null
      : React.lazy(() =>
           import('@tanstack/react-query-devtools').then((res) => ({
              default: res.ReactQueryDevtools,
           }))
        );

function Root() {
   return (
      <>
         <Outlet />
         <Suspense fallback={null}>
            <TanStackRouterDevtools />
            <ReactQueryDevtools />
         </Suspense>
      </>
   );
}

export const Route = createRootRouteWithContext<{
   queryClient: QueryClient;
   user: any;
}>()({
   component: Root,
});
