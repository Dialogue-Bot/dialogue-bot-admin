import { Layout } from '@/components/layouts/setting';
import { settingQueryOption } from '@/lib/query-options/setting';
import { useSettingStore } from '@/store/use-setting';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_private/settings')({
   component: Layout,
   loader: async ({ context }) => {
      const data =
         await context.queryClient.ensureQueryData(settingQueryOption());

      useSettingStore.getState().setSetting(data);
   },
});
