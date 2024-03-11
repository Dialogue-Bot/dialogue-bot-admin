import { useTranslation } from 'react-i18next'
import * as z from 'zod'

export const useUpdateInforSchema = () => {
  const { t } = useTranslation('forms')

  return z.object({
    name: z.string().optional(),
    email: z.string().email(t('email.errors.email')).optional(),
    avatar: z.string().optional(),
  })
}

export type TUpdateInfor = z.infer<ReturnType<typeof useUpdateInforSchema>>
