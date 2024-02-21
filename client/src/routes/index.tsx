import { createFileRoute } from '@tanstack/react-router';

function Index() {
   return <div className="p-2">hi</div>;
}

export const Route = createFileRoute('/')({
   component: Index,
});
