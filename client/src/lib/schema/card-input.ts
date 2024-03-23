import { useTranslation } from 'react-i18next'
import * as z from 'zod'

export const useCardInputSchema = () => {
  const { t } = useTranslation('forms')

  return z.object({
    title: z
      .string({
        required_error: t('card_title.errors.required'),
      })
      .min(1, {
        message: t('card_title.errors.required'),
      }),
    subtitle: z
      .string({
        required_error: t('card_subtitle.errors.required'),
      })
      .min(1, {
        message: t('card_subtitle.errors.required'),
      }),
    imageUrl: z.string().optional(),
    buttons: z.array(
      z
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
          type: z.enum(['url', 'postback']),
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
        ),
    ),
  })
}

export type TCardInput = z.infer<ReturnType<typeof useCardInputSchema>>
