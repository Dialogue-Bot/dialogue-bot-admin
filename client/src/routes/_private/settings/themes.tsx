import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_private/settings/themes')({
   component: () => <div>Hello /_private/settings/profiles!</div>,
});
