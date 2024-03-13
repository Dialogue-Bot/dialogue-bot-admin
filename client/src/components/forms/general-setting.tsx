import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  MultipleSelect,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui'
import { useErrorsLngChange } from '@/hooks/use-errors-lng-change'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { TFlowInput, useFlowInputSchema } from '@/lib/schema/flow-input'
import { queryChannelsForSelectOption } from '@/lib/query-options/channel'
import { useParams } from 'react-router-dom'
import { useSuspenseQuery } from '@tanstack/react-query'
import i18n from '@/i18n'

const LANGS: Record<string, string> = {
  vi: i18n.t('common:langs.vi'),
  en: i18n.t('common:langs.en'),
}

type Props = {
  id?: string
  onSubmit?: (data: TFlowInput) => void
  defaultValues?: TFlowInput
}

export const GeneralSettingForm = ({
  id = 'general-setting-form',
  onSubmit,
  defaultValues,
}: Props) => {
  const { id: flowId } = useParams()
  const { data } = useSuspenseQuery(
    queryChannelsForSelectOption(flowId as string),
  )
  const { t } = useTranslation('forms')
  const schema = useFlowInputSchema()
  const form = useForm<TFlowInput>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      ...defaultValues,
      channelIds: data
        .filter((item) => item.isSelected)
        .map((item) => item.value),
    },
  })

  useErrorsLngChange(form)

  const handleSubmit = (data: TFlowInput) => {
    if (onSubmit) {
      onSubmit(data)
    }
  }

  return (
    <Form {...form}>
      <form
        className='space-y-3'
        id={id}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          name='channelIds'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('channels.label')}</FormLabel>
              <FormControl>
                <MultipleSelect
                  options={
                    data?.map((item) => ({
                      label: item.label,
                      value: item.value,
                    })) || []
                  }
                  onChange={field.onChange}
                  values={field.value}
                  placeholder={t('channels.placeholder')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='settings'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Label>{t('bot_lang.label')}</Label>
              </FormLabel>

              <Select
                onValueChange={(value) => {
                  field.onChange([
                    {
                      type: 'language',
                      value,
                      default: true,
                      label: 'Language',
                    },
                  ])
                }}
                defaultValue={
                  field.value?.find((setting) => setting.type === 'language')
                    ?.value
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('bot_lang.placeholder')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(LANGS).map((lang) => {
                    return (
                      <SelectItem key={lang} value={lang}>
                        {LANGS[lang]}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              <FormDescription>{t('bot_lang.description')}</FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default GeneralSettingForm
