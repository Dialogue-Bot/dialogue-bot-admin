import { Layout } from '@/components/layouts/setting';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_private/settings')({
   component: Layout,
});
