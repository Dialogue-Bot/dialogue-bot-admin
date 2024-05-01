import { useTranslation } from 'react-i18next'
import * as z from 'zod'

export const useCustomChatBoxSchema = () => {
  const { t } = useTranslation('forms')

  return z.object({
    logoUrl: z.string().optional(),
    channelId: z.string(),
    name: z.string().optional(),
    color: z
      .string()
      .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, {
        message: t('color.errors.invalid'),
      })
      .optional()
      .default('#2563eb'),
    buttonSize: z.coerce
      .number({
        required_error: t('button_size.errors.required'),
      })
      .min(40, {
        message: t('button_size.errors.min', {
          min: 40,
        }),
      })
      .default(40),
    position: z
      .object({
        x: z.coerce.number({
          required_error: t('chat_window_position.errors.required_x'),
        }),
        y: z.coerce.number({
          required_error: t('chat_window_position.errors.required_y'),
        }),
      })
      .required({
        x: true,
        y: true,
      }),
    windowSize: z.object({
      width: z.coerce
        .number({
          required_error: t('chat_window_size.errors.required_width'),
        })
        .min(320, {
          message: t('chat_window_size.errors.min_width', {
            min: 320,
          }),
        }),
      height: z.coerce
        .number({
          required_error: t('chat_window_size.errors.required_height'),
        })
        .min(500, {
          message: t('chat_window_size.errors.min_height', {
            min: 500,
          }),
        }),
    }),
  })
}

export type TCustomChatBox = z.infer<ReturnType<typeof useCustomChatBoxSchema>>
