import { useUserStore } from '@/store/use-user';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
   component: () => (
      <>
         <Outlet />
      </>
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
