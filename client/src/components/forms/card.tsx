import { TCardInput, useCardInputSchema } from '@/lib/schema/card-input'
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
  InputButtons,
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

        <FormField
          name='buttons'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputButtons
                  defaultValue={{
                    buttons: field.value,
                  }}
                  onChange={({ buttons }) => {
                    field.onChange(buttons)
                  }}
                />
              </FormControl>
            </FormItem>
          )}
          control={form.control}
        />
      </form>
    </Form>
  )
}
