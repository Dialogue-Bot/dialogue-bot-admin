import { useTranslation } from 'react-i18next'
import * as z from 'zod'

export const useFlowInputSchema = () => {
  const { t } = useTranslation('forms')

  return z.object({
    name: z
      .string({
        required_error: t('name.errors.required'),
      })
      .min(1, {
        message: t('name.errors.required'),
      }),
    edges: z.array(z.record(z.any())).optional(),
    nodes: z.array(z.record(z.any())).optional(),
    settings: z.array(z.record(z.any())).optional(),
    variables: z
      .array(
        z.object({
          name: z.string(),
          value: z.string(),
        }),
      )
      .optional(),
    flows: z.array(z.record(z.any())).optional(),
    channelIds: z.array(z.string()).optional(),
  })
}

export type TFlowInput = z.infer<ReturnType<typeof useFlowInputSchema>>
