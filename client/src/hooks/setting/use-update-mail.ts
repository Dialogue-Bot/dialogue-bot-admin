import { settingApi } from '@/apis/setting';
import { TSettingMail } from '@/lib/schema/setting-mail';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export const useUpdateSettingMail = () => {
   const { t } = useTranslation('common');
   return useMutation({
      mutationFn: async (data: TSettingMail) => {
         return settingApi.updateMailSetting(data);
      },
      onSuccess(data) {
         toast.success(data.message);
      },
      onError(err: any) {
         toast.error(err?.response?.data?.message || t('api_error'));
      },
   });
};
