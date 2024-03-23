import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from '@/components/ui'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as z from 'zod'

const schema = z.object({
  buttons: z.array(
    z.object({
      label: z.string(),
      url: z.string(),
    }),
  ),
})

type TInputButtons = z.infer<typeof schema>

type Props = {
  onChange?: (data: TInputButtons) => void

  defaultValue?: TInputButtons
}

export const InputButtons = ({ onChange, defaultValue }: Props) => {
  const { t } = useTranslation(['forms', 'flowDetail'])
  const forms = useForm<TInputButtons>({
    resolver: zodResolver(schema),
    defaultValues: {
      buttons: [
        {
          label: '',
          url: '',
        },
      ],
    },
    mode: 'onChange',
    values: defaultValue,
  })

  const { append, fields, remove } = useFieldArray({
    name: 'buttons',
    control: forms.control,
  })

  const buttonsWatch = forms.watch('buttons')

  useEffect(() => {
    onChange?.({
      buttons: buttonsWatch,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonsWatch])

  return (
    <div className='space-y-3'>
      <Form {...forms}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
          className={cn(
            'space-y-3 max-h-[180px] overflow-y-auto hidden-scroll',
            {
              'py-2 px-[2px]': fields.length > 0,
            },
          )}
        >
          {fields.map((field, index) => {
            return (
              <div key={field.id} className='flex gap-3'>
                <FormField
                  name={`buttons.${index}.label`}
                  control={forms.control}
                  render={({ field }) => {
                    return (
                      <FormItem className='w-full'>
                        <FormControl>
                          <Input
                            {...field}
                            autoComplete='off'
                            placeholder={t('button_label.placeholder')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  name={`buttons.${index}.url`}
                  control={forms.control}
                  render={({ field }) => {
                    return (
                      <FormItem className='w-full'>
                        <FormControl>
                          <Input
                            {...field}
                            autoComplete='off'
                            placeholder={t('button_url.placeholder')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <Button
                  size='icon'
                  onClick={() => {
                    remove(index)
                  }}
                  variant='destructive'
                  className='flex-shrink-0'
                >
                  <X />
                </Button>
              </div>
            )
          })}
        </form>
      </Form>
      <div className='flex items-center justify-end'>
        <Button
          onClick={() => {
            append({ label: '', url: '' })
          }}
        >
          {t('flowDetail:add_btn')}
        </Button>
      </div>
    </div>
  )
}

export default InputButtons
