import { useErrorsLngChange } from '@/hooks/use-errors-lng-change'
import { TChangePass, useChangePasswordSchema } from '@/lib/schema/change-pass'
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
  onSubmit?: (data: TChangePass) => void
  hasBtn?: boolean
  loading?: boolean
}

export const ChangePassForm = ({ onSubmit, hasBtn, loading }: Props) => {
  const { t } = useTranslation(['forms', 'common'])

  const schema = useChangePasswordSchema()

  const form = useForm<TChangePass>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const handleSubmit = (data: TChangePass) => {
    onSubmit?.(data)

    form.reset({
      oldPassword: '',
      password: '',
      passwordConfirm: '',
    })
  }

  useErrorsLngChange(form)

  return (
    <Form {...form}>
      <form
        className='space-y-3'
        onSubmit={form.handleSubmit(handleSubmit)}
        id='change-pass-form'
      >
        <FormField
          control={form.control}
          name='oldPassword'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel required>{t('oldPassword.label')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('oldPassword.placeholder')}
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
          name='password'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel required>{t('password.label')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('password.placeholder')}
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
                <FormLabel required>{t('confirmPassword.label')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('confirmPassword.placeholder')}
                    type='password'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        {hasBtn && <Button loading={loading}>{t('common:save')}</Button>}
      </form>
    </Form>
  )
}

export default ChangePassForm
