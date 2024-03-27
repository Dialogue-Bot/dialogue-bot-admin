import { useTranslation } from 'react-i18next'
import * as z from 'zod'

export const useBotSendMailSchema = () => {
  const { t } = useTranslation('forms')

  return z.object({
    subject: z
      .string({
        required_error: t('subject.errors.required'),
      })
      .min(1, {
        message: t('subject.errors.required'),
      }),
    to: z
      .string({
        required_error: t('mail_to.errors.required'),
      })
      .min(1, {
        message: t('mail_to.errors.required'),
      })
      .refine(
        (value) => {
          let check = true

          if (value.includes('@')) {
            check = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          } else {
            check = /^\{[^\d\W]\w*\}$/.test(value)
          }

          return check
        },
        {
          message: t('mail_to.errors.invalid'),
        },
      ),
    body: z
      .string({
        required_error: t('mail_body.errors.required'),
      })
      .min(1, {
        message: t('mail_body.errors.required'),
      }),
  })
}

export type TBotSendMail = z.infer<ReturnType<typeof useBotSendMailSchema>>
