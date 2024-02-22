import { useTranslation } from 'react-i18next';
import * as z from 'zod';

export const useForgotPassSchema = () => {
   const { t } = useTranslation('forms');

   return z.object({
      email: z
         .string({
            required_error: t('email.errors.required'),
         })
         .email({
            message: t('email.errors.email'),
         }),
   });
};

export type TForgotPass = z.infer<ReturnType<typeof useForgotPassSchema>>;
