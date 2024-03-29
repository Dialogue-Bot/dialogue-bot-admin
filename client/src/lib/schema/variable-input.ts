import {
  isStringArray,
  isStringBoolean,
  isStringNumber,
  isStringObject,
} from '@/utils'
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
        })
        .regex(/^[a-zA-Z][a-zA-Z\d_]*$/, {
          message: t('variable_name.errors.invalid'),
        }),
      value: z.any().optional(),
      type: z
        .enum(['string', 'number', 'boolean', 'array', 'object'])
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

      if (type === 'array' && !isStringArray(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('variable_value.errors.array'),
          path: ['value'],
        })
      }

      if (type === 'object' && !isStringObject(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('variable_value.errors.object'),
          path: ['value'],
        })
      }
    })
}

export type TVariableInput = z.infer<ReturnType<typeof useVariableInputSchema>>
