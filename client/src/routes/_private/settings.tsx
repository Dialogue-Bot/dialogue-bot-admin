import { createFileRoute } from '@tanstack/react-router';

const Settings = () => {
   return <div>Settings</div>;
};

export const Route = createFileRoute('/_private/settings')({
   component: Settings,
});
