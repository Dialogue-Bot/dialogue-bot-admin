import { flowApi } from '@/apis/flow';
import { ROUTES } from '@/constants';
import { TFlowInput } from '@/lib/schema/flow-input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

/**
 * Custom hook for creating a flow.
 * @returns The mutation function for creating a flow.
 */
export const useCreateFlow = () => {
   const { t } = useTranslation('common');
   const queryClient = useQueryClient();
   const navigate = useNavigate();
   return useMutation({
      mutationFn: async (data: TFlowInput) => {
         return flowApi.create(data);
      },
      onSuccess(data) {
         queryClient.invalidateQueries({
            queryKey: ['flows'],
         });

         toast.success(data.message);

         console.log(data);

         navigate(`${ROUTES.PRIVATE.CHAT_BOT.INDEX}/${data.data.id}`);
      },

      onError(err: any) {
         toast.error(err?.response?.data?.message || t('api_error'));
      },
   });
};
