import { useTranslation } from 'react-i18next'
import * as z from 'zod'

export const useRegisterSchema = () => {
  const { t } = useTranslation('forms')

  return z
    .object({
      email: z
        .string({
          required_error: t('email.errors.required'),
        })
        .email({
          message: t('email.errors.email'),
        }),
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
      name: z
        .string({
          required_error: t('name.errors.required'),
        })
        .min(1, {
          message: t('name.errors.required'),
        }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: t('confirmPassword.errors.match'),
      path: ['passwordConfirm'],
    })
}

export type TRegister = z.infer<ReturnType<typeof useRegisterSchema>>
