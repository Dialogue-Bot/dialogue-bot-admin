import { TCardInput, useCardInputSchema } from '@/lib/schema/card-input'
import { zodResolver } from '@hookform/resolvers/zod'
import _ from 'lodash'
import { Plus, X } from 'lucide-react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui'
import InputImage from '../ui/input-image'

type Props = {
  id?: string

  onSubmit?: (data: TCardInput) => void
  defaultValue?: TCardInput
}

export const CardForm = ({
  defaultValue,
  id = 'card-form',
  onSubmit,
}: Props) => {
  const schema = useCardInputSchema()
  const { t } = useTranslation(['forms', 'flowDetail'])
  const form = useForm<TCardInput>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: defaultValue,
  })

  const { fields, append, remove } = useFieldArray({
    name: 'buttons',
    control: form.control,
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
      type: 'url',
    })
  }

  const handleSubmit = (data: TCardInput) => {
    onSubmit?.(data)
  }

  return (
    <Form {...form}>
      <form
        className='space-y-3'
        id={id}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel required>{t('card_title.label')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t('card_title.placeholder')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name='subtitle'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel required>{t('card_subtitle.label')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('card_subtitle.placeholder')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name='imageUrl'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{t('card_image_url.label')}</FormLabel>
                <FormControl>
                  <InputImage
                    defaultValue={field.value}
                    value={field.value}
                    onChange={field.onChange}
                    toServer
                    size={80}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <span>Buttons</span>
            <Button
              variant='outline'
              className='p-0 w-6 h-6'
              type='button'
              onClick={handleAddButton}
              disabled={fields.length >= 3}
            >
              <Plus className='w-4 h-4' />
            </Button>
          </div>
          {fields.length > 0 ? (
            fields.map((field, index) => {
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
                              {['url', 'postback'].map((type) => (
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
          ) : (
            <p className='flex items-center justify-center text-center text-sm text-muted-foreground'>
              {t('flowDetail:empty_buttons')}
            </p>
          )}
        </div>
      </form>
    </Form>
  )
}
