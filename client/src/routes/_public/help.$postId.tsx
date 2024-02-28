import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/help/$postId')({
   component: () => <div>Hello /_public/hep/$postId!</div>,
});
