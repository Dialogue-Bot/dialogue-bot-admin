import { useTranslation } from 'react-i18next'
import * as z from 'zod'
import { useButtonSchema } from './button'

export const useCardInputSchema = () => {
  const { t } = useTranslation('forms')
  const buttonSchema = useButtonSchema()
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
    imageUrl: z
      .string()
      .optional()
      .refine((value) => {
        if (!value) return true

        let check = true

        if (value?.includes('http') || value?.includes('https')) {
          check = /^(http|https):\/\/[^ "]+$/.test(value)
        } else {
          check = /^\{[^\d\W]\w*\}$/.test(value as string)
        }

        return check
      }, t('card_image_url.errors.invalid')),
    buttons: z.array(buttonSchema),
  })
}

export type TCardInput = z.infer<ReturnType<typeof useCardInputSchema>>
