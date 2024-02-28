import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_private/settings/')({
   component: () => <div></div>,
   beforeLoad() {
      throw redirect({
         to: '/settings/profiles',
         replace: true,
      });
   },
});
