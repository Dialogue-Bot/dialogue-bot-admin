import { useErrorsLngChange } from '@/hooks/use-errors-lng-change'
import { TEmail, useMailSchema } from '@/lib/schema/mail'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '../ui'

type Props = {
  onSubmit?: (data: TEmail) => void
  id?: string
  defaultValues?: TEmail
}

export const MailForm = ({
  onSubmit,
  id = 'mail-form',
  defaultValues,
}: Props) => {
  const { t } = useTranslation(['set_pass', 'forms'])

  const schema = useMailSchema()

  const form = useForm<TEmail>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues,
  })

  const handleSubmit = (data: TEmail) => {
    onSubmit?.(data)
  }

  useErrorsLngChange(form)

  return (
    <Form {...form}>
      <form
        className='space-y-3'
        onSubmit={form.handleSubmit(handleSubmit)}
        id={id}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel required>
                  {t('email.label', {
                    ns: 'forms',
                  })}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('email.placeholder', {
                      ns: 'forms',
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
      </form>
    </Form>
  )
}

export default MailForm
