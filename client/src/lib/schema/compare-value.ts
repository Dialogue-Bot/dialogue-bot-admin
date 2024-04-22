import { useTranslation } from 'react-i18next'
import * as z from 'zod'

export const useCompareValueSchema = () => {
  const { t } = useTranslation('forms')

  return z
    .object({
      operator: z
        .string({
          required_error: t('operator.errors.required'),
        })
        .min(1, {
          message: t('operator.errors.required'),
        }),
      value: z.any({
        required_error: t('value.errors.required'),
      }),
    })
    .superRefine((data, ctx) => {
      if (data.operator === 'exist' && data.value === '') {
        ctx.addIssue({
          path: ['value'],
          message: t('value.errors.required'),
          code: 'custom',
        })
      }
    })
}

export type TCompareValue = z.infer<ReturnType<typeof useCompareValueSchema>>
