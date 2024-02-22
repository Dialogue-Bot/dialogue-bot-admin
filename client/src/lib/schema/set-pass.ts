import { useTranslation } from 'react-i18next';
import * as z from 'zod';

export const useSetPassSchema = () => {
   const { t } = useTranslation('forms');

   return z
      .object({
         password: z
            .string({
               required_error: t('password.errors.required'),
            })
            .min(6, {
               message: t('password.errors.min', { min: 6 }),
            }),
         passwordConfirm: z.string({
            required_error: t('confirmPassword.errors.required'),
         }),
         token: z.string().or(z.literal('')).optional(),
      })
      .refine((data) => data.password === data.passwordConfirm, {
         message: t('confirmPassword.errors.match'),
         path: ['passwordConfirm'],
      });
};

export type TSetPass = z.infer<ReturnType<typeof useSetPassSchema>>;
