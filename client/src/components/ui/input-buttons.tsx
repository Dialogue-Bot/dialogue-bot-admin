import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { TButtons, useButtonsSchema } from '@/lib/schema/buttons'
import { zodResolver } from '@hookform/resolvers/zod'
import _ from 'lodash'
import { Plus, X } from 'lucide-react'
import { useEffect } from 'react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type Props = {
  onChange?: (data: TButtons) => void
  defaultValue?: TButtons
  types?: Array<string>
}

export const InputButtons = ({
  onChange,
  defaultValue,
  types = ['url', 'postback'],
}: Props) => {
  const { t } = useTranslation(['forms', 'common'])
  const schema = useButtonsSchema()
  const form = useForm<TButtons>({
    resolver: zodResolver(schema),
    defaultValues: {
      buttons: defaultValue?.buttons || [],
    },
    mode: 'onChange',
  })

  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: 'buttons',
  })

  const buttonsWatch = useWatch({
    control: form.control,
    name: 'buttons',
  })

  const handleAddButton = () => {
    form.trigger('buttons')

    if (
      !_.isEmpty(form.formState.errors.buttons) ||
      buttonsWatch?.some((field) => !field.label || !field.value)
    )
      return

    append({
      label: '',
      value: '',
      type: 'postback',
    })
  }

  useEffect(() => {
    onChange?.({
      buttons: buttonsWatch,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonsWatch])

  return (
    <Form {...form}>
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <Label>Buttons</Label>
          <Button
            variant='outline'
            className='p-0 w-6 h-6'
            type='button'
            onClick={handleAddButton}
          >
            <Plus className='w-4 h-4' />
          </Button>
        </div>
        <div className='space-y-2 max-h-32 overflow-y-auto hidden-scroll px-1 py-1'>
          {fields.length > 0
            ? fields.map((field, index) => {
                return (
                  <div key={field.id} className='flex gap-3'>
                    <FormField
                      name={`buttons.${index}.label`}
                      control={form.control}
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
                      name={`buttons.${index}.value`}
                      control={form.control}
                      render={({ field }) => {
                        return (
                          <FormItem className='w-full'>
                            <FormControl>
                              <Input
                                {...field}
                                autoComplete='off'
                                placeholder={t('button_value.placeholder')}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )
                      }}
                    />
                    <FormField
                      name={`buttons.${index}.type`}
                      control={form.control}
                      render={({ field }) => {
                        return (
                          <FormItem className='w-24 flex-shrink-0'>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {types.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
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
              })
            : null}
        </div>
      </div>
    </Form>
  )
}

export default InputButtons
