import { useTranslation } from 'react-i18next'
import * as z from 'zod'
import { useVariableInputSchema } from './variable-input'

export const useFlowInputSchema = () => {
  const { t } = useTranslation('forms')

  const variableSchema = useVariableInputSchema()

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
    variables: z.array(variableSchema).optional(),
    flows: z.array(z.record(z.any())).optional(),
    channelIds: z.array(z.string()).optional(),
  })
}

export type TFlowInput = z.infer<ReturnType<typeof useFlowInputSchema>>
