import { useErrorsLngChange } from '@/hooks/use-errors-lng-change'
import { TSetPass, useSetPassSchema } from '@/lib/schema/set-pass'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '../ui'

type Props = {
  loading?: boolean
  onSubmit?: (data: TSetPass) => void
}

export const SetPassForm = ({ loading, onSubmit }: Props) => {
  const { t } = useTranslation(['set_pass', 'forms'])

  const schema = useSetPassSchema()

  const form = useForm<TSetPass>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const handleSubmit = (data: TSetPass) => {
    onSubmit?.(data)
  }

  useErrorsLngChange(form)

  return (
    <Form {...form}>
      <form className='space-y-3' onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel required>
                  {t('password.label', {
                    ns: 'forms',
                  })}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('password.placeholder', {
                      ns: 'forms',
                      min: 6,
                    })}
                    type='password'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name='passwordConfirm'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel required>
                  {t('confirmPassword.label', {
                    ns: 'forms',
                  })}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('confirmPassword.placeholder', {
                      ns: 'forms',
                    })}
                    type='password'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <Button className='w-full' type='submit' loading={loading}>
          {t('btn_submit', {
            ns: 'set_pass',
          })}
        </Button>
      </form>
    </Form>
  )
}

export default SetPassForm
