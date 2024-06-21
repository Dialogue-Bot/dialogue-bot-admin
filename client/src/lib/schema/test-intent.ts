import { useTranslation } from 'react-i18next'
import * as z from 'zod'

export const useTestIntentSchema = () => {
  const { t } = useTranslation('forms')

  return z.object({
    text: z
      .string({
        required_error: t('text.errors.required'),
      })
      .min(1, {
        message: t('text.errors.required'),
      }),
    referenceId: z.string(),
  })
}

export type TTestIntent = z.infer<ReturnType<typeof useTestIntentSchema>>
