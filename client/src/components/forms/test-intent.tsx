import { useErrorsLngChange } from '@/hooks/use-errors-lng-change'
import { TTestIntent, useTestIntentSchema } from '@/lib/schema/test-intent'
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
  onSubmit?: (data: TTestIntent) => void
  defaultValues?: Partial<TTestIntent>
}

export const TestIntentForm = ({ onSubmit, defaultValues }: Props) => {
  const { t } = useTranslation(['forms', 'common'])

  const schema = useTestIntentSchema()

  const form = useForm<TTestIntent>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues,
  })

  const handleSubmit = (data: TTestIntent) => {
    onSubmit?.(data)
  }

  useErrorsLngChange(form)

  return (
    <Form {...form}>
      <form
        className='space-y-3'
        onSubmit={form.handleSubmit(handleSubmit)}
        id='test-intent-form'
      >
        <FormField
          control={form.control}
          name='text'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel required>{t('text.label')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('text.placeholder')}
                    autoComplete='one-time-code'
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

export default TestIntentForm
