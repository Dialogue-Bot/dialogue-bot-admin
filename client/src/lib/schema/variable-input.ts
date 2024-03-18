import { isStringBoolean, isStringNumber } from '@/utils'
import { useTranslation } from 'react-i18next'
import * as z from 'zod'

export const useVariableInputSchema = () => {
  const { t } = useTranslation('forms')

  return z
    .object({
      name: z
        .string({
          required_error: t('variable_name.errors.required'),
        })
        .min(1, {
          message: t('variable_name.errors.required'),
        }),
      value: z.any().optional(),
      type: z
        .enum(['string', 'number', 'boolean'])
        .default('string')
        .optional(),
    })
    .superRefine(({ value, type }, ctx) => {
      if (!value) return

      if (type === 'number' && !isStringNumber(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('variable_value.errors.number'),
          path: ['value'],
        })
      }

      if (type === 'boolean' && !isStringBoolean(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('variable_value.errors.boolean'),
          path: ['value'],
        })
      }
    })
}

export type TVariableInput = z.infer<ReturnType<typeof useVariableInputSchema>>
