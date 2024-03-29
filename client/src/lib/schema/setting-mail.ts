import { useTranslation } from 'react-i18next'
import * as z from 'zod'

export const useSettingMailSchema = () => {
  const { t } = useTranslation('forms')

  return z.object({
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
  })
}

export type TSettingMail = z.infer<ReturnType<typeof useSettingMailSchema>>
