import { createFileRoute, redirect } from '@tanstack/react-router';

const Dashboard = () => {
   return <div>Dashboard</div>;
};

export const Route = createFileRoute('/_private/dashboard')({
   component: Dashboard,
   beforeLoad() {
      throw redirect({
         to: '/chatbots',
         replace: true,
      });
   },
});
