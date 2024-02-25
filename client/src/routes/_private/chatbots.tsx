import { useUserStore } from '@/store/use-user';
import { createFileRoute } from '@tanstack/react-router';

const Chatbots = () => {
   const { user } = useUserStore();

   return <div>{JSON.stringify(user)}</div>;
};

export const Route = createFileRoute('/_private/chatbots')({
   component: () => <Chatbots />,
});
