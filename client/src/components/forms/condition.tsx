import { CONDITIONAL_OPERATOR } from '@/constants'
import {
  TCompareValue,
  useCompareValueSchema,
} from '@/lib/schema/compare-value'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui'

type Props = {
  onSubmit?: (data: TCompareValue) => void
  defaultValues?: TCompareValue
  id?: string
}

const ConditionForm = ({
  defaultValues,
  onSubmit,
  id = 'condition-form',
}: Props) => {
  const schema = useCompareValueSchema()
  const form = useForm<TCompareValue>({
    defaultValues,
    resolver: zodResolver(schema),
  })
  const { t } = useTranslation(['forms', 'flowDetail'])

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit?.(data)
  })

  return (
    <Form {...form}>
      <form className='space-y-3' onSubmit={handleSubmit} id={id}>
        <div className='flex space-x-3'>
          <FormField
            name='operator'
            control={form.control}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>{t('operator.label')}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('operator.placeholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CONDITIONAL_OPERATOR.map((c) => {
                      return (
                        <SelectItem key={c} value={c}>
                          {
                            // @ts-ignore
                            t(`flowDetail:compare_types.${c}`)
                          }
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='value'
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className='w-full'>
                  <FormLabel>{t('value.label')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t('value.placeholder')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </div>
      </form>
    </Form>
  )
}

export default ConditionForm
