import {
  TCustomChatBox,
  useCustomChatBoxSchema,
} from '@/lib/schema/custom-chatbox'
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
  Label,
} from '../ui'

type Props = {
  id?: 'custom-chatbox-form'
  channelId: string
  onSubmit?: (data: TCustomChatBox) => void
  defaultValues?: TCustomChatBox
}

export const CustomChatBoxForm = ({
  channelId,
  id,
  onSubmit,
  defaultValues,
}: Props) => {
  const { t } = useTranslation('forms')
  const schema = useCustomChatBoxSchema()
  const form = useForm<TCustomChatBox>({
    defaultValues: {
      color: '#2563eb',
      buttonSize: 40,
      position: { x: 24, y: 24 },
      windowSize: { width: 320, height: 500 },
      name: 'DialogueBot',
      channelId,
      logoUrl:
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1ib3QtbWVzc2FnZS1zcXVhcmUiPjxwYXRoIGQ9Ik0xMiA2VjJIOCIvPjxwYXRoIGQ9Im04IDE4LTQgNFY4YTIgMiAwIDAgMSAyLTJoMTJhMiAyIDAgMCAxIDIgMnY4YTIgMiAwIDAgMS0yIDJaIi8+PHBhdGggZD0iTTIgMTJoMiIvPjxwYXRoIGQ9Ik05IDExdjIiLz48cGF0aCBkPSJNMTUgMTF2MiIvPjxwYXRoIGQ9Ik0yMCAxMmgyIi8+PC9zdmc+',
      ...defaultValues,
    },
    resolver: zodResolver(schema),
  })

  const hanleSubmit = form.handleSubmit((data) => {
    onSubmit?.(data)
  })

  return (
    <Form {...form}>
      <form className='space-y-3' onSubmit={hanleSubmit} id={id}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{t('bot_name.label')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('bot_name.placeholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name='logoUrl'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{t('logo_url.label')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('logo_url.placeholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name='color'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel required>{t('color.label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('color.placeholder')}
                    {...field}
                    type='color'
                    className='w-20'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name='buttonSize'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel required>{t('button_size.label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('button_size.placeholder')}
                    {...field}
                    type='number'
                    min={40}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <div className='space-y-2'>
          <Label required>{t('chat_window_position.label')}</Label>
          <div className='flex space-x-3'>
            <FormField
              control={form.control}
              name='position.x'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={t('chat_window_position.placeholder_x')}
                        {...field}
                        type='number'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name='position.y'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={t('chat_window_position.placeholder_x')}
                        {...field}
                        type='number'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </div>
        </div>
        <div className='space-y-2'>
          <Label required>{t('chat_window_size.label')}</Label>
          <div className='flex space-x-3'>
            <FormField
              control={form.control}
              name='windowSize.width'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={t('chat_window_size.placeholder_width')}
                        {...field}
                        type='number'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name='windowSize.height'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={t('chat_window_size.placeholder_height')}
                        {...field}
                        type='number'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </div>
        </div>
      </form>
    </Form>
  )
}

export default CustomChatBoxForm
