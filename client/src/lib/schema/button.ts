import { useTranslation } from 'react-i18next'
import * as z from 'zod'

export const useButtonSchema = () => {
  const { t } = useTranslation('forms')

  return z
    .object({
      label: z
        .string({
          required_error: t('button_label.errors.required'),
        })
        .min(1, {
          message: t('button_label.errors.required'),
        }),
      value: z
        .string({
          required_error: t('button_value.errors.required'),
        })
        .min(1, {
          message: t('button_value.errors.required'),
        }),
      type: z.enum(['url', 'postback', 'text']),
    })
    .refine(
      ({ type, value }) => {
        const regex =
          /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi

        if (type === 'url' && value.match(new RegExp(regex))) {
          return true
        } else if (type === 'postback') {
          return true
        }

        return false
      },
      {
        message: t('button_url.errors.url'),
        path: ['value'],
      },
    )
}

export type ButtonSchema = z.infer<ReturnType<typeof useButtonSchema>>
