import { useTranslation } from 'react-i18next'
import * as z from 'zod'

export const useChangePasswordSchema = () => {
  const { t } = useTranslation('forms')

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
      oldPassword: z.string({
        required_error: t('oldPassword.errors.required'),
      }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: t('confirmPassword.errors.match'),
      path: ['passwordConfirm'],
    })
}

export type TChangePass = z.infer<ReturnType<typeof useChangePasswordSchema>>
