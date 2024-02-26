import { useLogout } from '@/hooks/auth';
import { useUserStore } from '@/store/use-user';
import { createFileRoute } from '@tanstack/react-router';

const Chatbots = () => {
   const { user } = useUserStore();
   const logoutMutaion = useLogout();

   return (
      <div>
         {JSON.stringify(user)}
         <button
            onClick={() => {
               logoutMutaion.mutate();
            }}
         >
            Logout
         </button>
      </div>
   );
};

export const Route = createFileRoute('/_private/chatbots')({
   component: () => <Chatbots />,
});
