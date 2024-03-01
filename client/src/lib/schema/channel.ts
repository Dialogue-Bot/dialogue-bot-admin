import { channelApi } from '@/apis/channel';
import { ChannelType } from '@/types/channel';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';

export const useChannelSchema = () => {
   const { t } = useTranslation('forms');

   return z
      .object({
         contactId: z
            .string({
               required_error: t('contactId.errors.required'),
            })
            .min(1, t('contactId.errors.required')),
         contactName: z
            .string({
               required_error: t('contactName.errors.required'),
            })
            .min(1, t('contactName.errors.required')),
         channelTypeId: z
            .string({
               required_error: t('channelTypeId.errors.required'),
            })
            .min(1, t('channelTypeId.errors.required')),
         credentials: z
            .object({
               pageToken: z.string().optional(),
               webhookSecret: z.string().optional(),
            })
            .optional(),
         active: z.boolean().default(true),
      })
      .superRefine(async (data, ctx) => {
         if (data.credentials) {
            const type = await channelApi
               .getChannelType(data.channelTypeId)
               .then((r) => r.data);

            switch (type.name) {
               case ChannelType.MESSENGER:
                  if (!data.credentials.pageToken) {
                     ctx.addIssue({
                        path: ['credentials', 'pageToken'],
                        code: 'custom',
                        message: t('pageToken.errors.required'),
                     });
                  }

                  if (!data.credentials.webhookSecret) {
                     ctx.addIssue({
                        path: ['credentials', 'webhookSecret'],
                        code: 'custom',
                        message: t('webhookSecret.errors.required'),
                     });
                  }
                  break;
               case ChannelType.LINE:
                  if (!data.credentials.pageToken) {
                     ctx.addIssue({
                        path: ['credentials', 'pageToken'],
                        code: 'custom',
                        message: t('pageToken.errors.required'),
                     });
                  }
                  break;
               default:
                  break;
            }
         }
      });
};

export type TChannelInput = z.infer<ReturnType<typeof useChannelSchema>>;
