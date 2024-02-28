import { createFileRoute } from '@tanstack/react-router';

type Props = {};

const Help = (props: Props) => {
   return <div>Help</div>;
};

export const Route = createFileRoute('/_public/help/')({
   component: Help,
});
