import { useDidUpdate } from '@/hooks/use-did-update'
import { useErrorsLngChange } from '@/hooks/use-errors-lng-change'
import { queryChannelTypesOption } from '@/lib/query-options/channel'
import { queryFlowsForSelectOption } from '@/lib/query-options/flow'
import { TChannelInput, useChannelSchema } from '@/lib/schema/channel'
import { ChannelType } from '@/types/channel'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from '../ui'

type Props = {
  id?: string
  onSubmit?: (data: TChannelInput) => void
  defaultValues?: TChannelInput
  channelId?: string
}

const ChannelForm = ({
  id = 'channel-form',
  onSubmit,
  defaultValues,
  channelId,
}: Props) => {
  const { t } = useTranslation('forms')
  const { data: flows } = useQuery(queryFlowsForSelectOption(channelId || ''))
  const { data: types } = useQuery(queryChannelTypesOption)

  const schema = useChannelSchema()
  const form = useForm<TChannelInput>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      active: true,
      ...defaultValues,
    },
  })

  const channelTypeId = form.watch('channelTypeId')

  const currentType = useMemo(
    () => types?.find((type) => type.id === channelTypeId),
    [channelTypeId, types],
  )

  useErrorsLngChange(form)

  const handleSubmit = (data: TChannelInput) => {
    if (onSubmit) {
      onSubmit(data)
    }
  }

  useDidUpdate(() => {
    form.setValue('credentials', {})
  }, [currentType, form])

  return (
    <Form {...form}>
      <form
        className='space-y-3'
        id={id}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          name='contactId'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contactId.label')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('contactId.placeholder')}
                  autoComplete='off'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='contactName'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contactName.label')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('contactName.placeholder')}
                  autoComplete='off'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='active'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between'>
              <div className='space-y-0.5'>
                <FormLabel>
                  <Label>{t('active.label')}</Label>
                </FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='flowId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Label>{t('flow.label')}</Label>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('flow.placeholder')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {flows?.map((flow) => {
                    return (
                      <SelectItem key={flow.value} value={flow.value}>
                        {flow.label}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          name='channelTypeId'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('channelTypeId.label')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('channelTypeId.placeholder')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {types?.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        {currentType &&
          (currentType.name === ChannelType.MESSENGER ||
            currentType.name === ChannelType.LINE) && (
            <>
              <FormField
                name='credentials.pageToken'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('pageToken.label')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t('pageToken.placeholder')}
                        autoComplete='off'
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {currentType.name === ChannelType.MESSENGER && (
                <FormField
                  name='credentials.webhookSecret'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('webhookSecret.label')}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t('webhookSecret.placeholder')}
                          autoComplete='off'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </>
          )}
      </form>
    </Form>
  )
}

export default ChannelForm
