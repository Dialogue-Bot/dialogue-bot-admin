import { useTranslation } from 'react-i18next';
import * as z from 'zod';

export const useLoginSchema = () => {
   const { t } = useTranslation('forms');

   return z.object({
      email: z
         .string({
            required_error: t('email.errors.required'),
         })
         .email({
            message: t('email.errors.email'),
         }),
      password: z.string({
         required_error: t('password.errors.required'),
      }),
   });
};

export type TLogin = z.infer<ReturnType<typeof useLoginSchema>>;
