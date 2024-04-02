import { useTranslation } from 'react-i18next'
import { z } from 'zod'

export const useIntentInputSchema = () => {
  const { t } = useTranslation('forms')

  return z
    .object({
      name: z.string({
        required_error: t('name.errors.required'),
      }),
      referenceId: z.string({
        required_error: t('referenceId.errors.required'),
      }),
      trainType: z.enum(['manual', 'automation']).default('manual'),
      trainDescription: z
        .array(
          z.object({
            intent: z
              .string({
                required_error: t('intent.errors.required'),
              })
              .min(1, { message: t('intent.errors.required') }),
            description: z
              .string({
                required_error: t('description.errors.required'),
              })
              .min(1, { message: t('description.errors.required') }),
          }),
        )
        .optional(),
      intents: z
        .array(
          z.object({
            intent: z
              .string({
                required_error: t('intent.errors.required'),
              })
              .min(1, { message: t('intent.errors.required') }),
            prompts: z
              .string({
                required_error: t('prompt.errors.required'),
              })
              .min(1, {
                message: t('prompt.errors.required'),
              }),
            answers: z
              .string({
                required_error: t('answer.errors.required'),
              })
              .min(1, {
                message: t('answer.errors.required'),
              }),
          }),
        )
        .optional(),
      entities: z.array(z.record(z.any())).optional(),
    })
    .superRefine((data, ctx) => {
      if (
        data.trainType === 'automation' &&
        (!data.trainDescription || data.trainDescription.length === 0)
      ) {
        ctx.addIssue({
          path: ['trainDescription'],
          message: t('train_description.errors.required'),
          code: z.ZodIssueCode.custom,
        })
      }

      if (
        data.trainType === 'manual' &&
        (!data.intents || data.intents.length === 0)
      ) {
        ctx.addIssue({
          path: ['intents'],
          message: t('intents.errors.required'),
          code: z.ZodIssueCode.custom,
        })
      }
    })
}

export type TIntentInput = z.infer<ReturnType<typeof useIntentInputSchema>>
