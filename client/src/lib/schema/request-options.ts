import { useTranslation } from 'react-i18next'
import * as z from 'zod'

export const useRequestOptionsSchema = () => {
  const { t } = useTranslation('forms')

  const keyValSchema = z.object({
    key: z
      .string({
        required_error: t('key.errors.required'),
      })
      .min(1, {
        message: t('key.errors.required'),
      }),
    value: z
      .string({
        required_error: t('value.errors.required'),
      })
      .min(1, {
        message: t('value.errors.required'),
      }),
  })

  return z.object({
    method: z.string({
      required_error: t('http_method.errors.required'),
    }),
    url: z
      .string({
        required_error: t('http_url.errors.required'),
      })
      .url({
        message: t('http_url.errors.url'),
      }),
    headers: z.array(keyValSchema).optional(),
    params: z.array(keyValSchema).optional(),
    query: z.array(keyValSchema).optional(),
    body: z.array(keyValSchema).optional(),
  })
}

export type TRequestOptions = z.infer<
  ReturnType<typeof useRequestOptionsSchema>
>
