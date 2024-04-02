import {
  TIntentInput as TIntentInputForm,
  useIntentInputSchema,
} from '@/lib/schema/intent-input'
import { TIntentInput } from '@/types/intent'
import { zodResolver } from '@hookform/resolvers/zod'
import _ from 'lodash'
import { Minus, Plus } from 'lucide-react'
import { useCallback } from 'react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Form,
  FormControl,
  FormDescription,
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
import { ContentEditable } from '../ui/content-editable'
type Props = {
  id?: 'intent-form'
  onSubmit?: (values: TIntentInput) => void
  defaultValues?: TIntentInputForm
}

const IntentForm = ({ defaultValues, id = 'intent-form', onSubmit }: Props) => {
  const { t } = useTranslation('forms')
  const schema = useIntentInputSchema()
  const form = useForm<TIntentInputForm>({
    defaultValues: {
      trainType: 'manual',
      ...defaultValues,
    },
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  console.log(form.formState.errors)

  const watchTrainType = form.watch('trainType')
  const trainDescriptionWatch = useWatch({
    control: form.control,
    name: 'trainDescription',
  })

  const trainDescriptionField = useFieldArray({
    control: form.control,
    name: 'trainDescription',
  })
  const intentsField = useFieldArray({
    control: form.control,
    name: 'intents',
  })

  const handleSubmit = form.handleSubmit((values) => {
    onSubmit?.({
      ...values,
      intents:
        values.intents?.map((intent) => {
          return {
            ...intent,
            prompts: intent.prompts
              .split(',')
              .map((prompt) => prompt.trim())
              .filter((prompt) => prompt !== ''),
            answers: intent.answers
              .split(',')
              .map((answer) => answer.trim())
              .filter((answer) => answer !== ''),
          }
        }) || [],
      entities: values.entities || [],
    })
  })

  const handleAddTrainDescription = useCallback(() => {
    form.trigger('trainDescription')

    if (
      (!_.isEmpty(form.formState.errors.trainDescription) &&
        Array.isArray(form.formState.errors.trainDescription)) ||
      trainDescriptionWatch?.some(
        (field) => !field.description || !field.intent,
      )
    )
      return

    trainDescriptionField.append({
      description: '',
      intent: '',
    })
  }, [form, trainDescriptionWatch, trainDescriptionField])

  const handleAddIntent = useCallback(() => {
    form.trigger('intents')

    if (
      (!_.isEmpty(form.formState.errors.intents) &&
        Array.isArray(form.formState.errors.intents)) ||
      intentsField.fields.some(
        (field) => !field.intent || !field.prompts || !field.answers,
      )
    )
      return

    intentsField.append({
      intent: '',
      prompts: '',
      answers: '',
    })
  }, [form, intentsField])

  const renderTrainAutomation = useCallback(() => {
    if (watchTrainType !== 'automation') return null

    return (
      <FormField
        name='trainDescription'
        control={form.control}
        render={() => {
          return (
            <FormItem>
              <div className='flex items-center justify-between'>
                <FormLabel>{t('train_description.label')}</FormLabel>
                <Button
                  size='icon'
                  className='p-0 w-5 h-5'
                  variant='outline'
                  type='button'
                  onClick={handleAddTrainDescription}
                >
                  <Plus className='w-4 h-4' />
                </Button>
              </div>
              {form.formState.errors.trainDescription?.message && (
                <p className='text-[0.8rem] font-medium text-destructive'>
                  {form.formState.errors.trainDescription?.message}
                </p>
              )}
              <div className='space-y-3'>
                {trainDescriptionField.fields.map((field, index) => {
                  return (
                    <div key={field.id} className='flex gap-3'>
                      <FormField
                        control={form.control}
                        name={`trainDescription.${index}.intent`}
                        render={({ field }) => {
                          return (
                            <FormItem className='w-full'>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder={t('intent.placeholder')}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )
                        }}
                      />
                      <FormField
                        control={form.control}
                        name={`trainDescription.${index}.description`}
                        render={({ field }) => {
                          return (
                            <FormItem className='w-full'>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder={t(
                                    'train_description.placeholder',
                                  )}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )
                        }}
                      />
                      <Button
                        size='icon'
                        variant='destructive'
                        className='flex-shrink-0'
                        type='button'
                        onClick={() => {
                          trainDescriptionField.remove(index)
                        }}
                      >
                        <Minus />
                      </Button>
                    </div>
                  )
                })}
              </div>
            </FormItem>
          )
        }}
      />
    )
  }, [
    watchTrainType,
    form.control,
    form.formState.errors.trainDescription?.message,
    t,
    handleAddTrainDescription,
    trainDescriptionField,
  ])

  const renderTrainManual = useCallback(() => {
    if (watchTrainType !== 'manual') return null

    return (
      <FormField
        name='intents'
        control={form.control}
        render={() => {
          return (
            <FormItem>
              <div className='flex items-center justify-between'>
                <FormLabel required>{t('intents.label')}</FormLabel>

                <Button
                  className='p-0 w-5 h-5'
                  size='icon'
                  variant='outline'
                  type='button'
                  onClick={handleAddIntent}
                >
                  <Plus className='w-4 h-4' />
                </Button>
              </div>
              {form.formState.errors.intents?.root?.message && (
                <p className='text-[0.8rem] font-medium text-destructive'>
                  {form.formState.errors.intents?.root?.message}
                </p>
              )}
              <div className='space-y-3'>
                {intentsField.fields.map((field, index) => {
                  return (
                    <div key={field.id} className='space-y-3'>
                      <div className='flex gap-3'>
                        <FormField
                          control={form.control}
                          name={`intents.${index}.intent`}
                          render={({ field }) => {
                            return (
                              <FormItem className='w-full'>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder={t('intent.placeholder')}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />
                        <Button
                          size='icon'
                          variant='destructive'
                          className='flex-shrink-0'
                          type='button'
                          onClick={() => {
                            intentsField.remove(index)
                          }}
                        >
                          <Minus />
                        </Button>
                      </div>
                      <div className='flex gap-3'>
                        <FormField
                          control={form.control}
                          name={`intents.${index}.prompts`}
                          render={({ field: { value, ...field } }) => {
                            return (
                              <FormItem className='w-1/2 flex-shrink-0'>
                                <FormControl>
                                  <ContentEditable
                                    html={value}
                                    onChange={(e) => {
                                      field.onChange(e.target.value)
                                    }}
                                    className='break-words min-h-72 break-all'
                                  />
                                </FormControl>
                                <FormMessage />
                                <FormDescription>
                                  {t('prompt.description')}
                                </FormDescription>
                              </FormItem>
                            )
                          }}
                        />
                        <FormField
                          control={form.control}
                          name={`intents.${index}.answers`}
                          render={({ field: { value, ...field } }) => {
                            return (
                              <FormItem className='w-1/2 flex-shrink-0'>
                                <FormControl>
                                  <ContentEditable
                                    html={value}
                                    onChange={(e) => {
                                      field.onChange(e.target.value)
                                    }}
                                    className='break-words min-h-72 break-all'
                                  />
                                </FormControl>
                                <FormMessage />
                                <FormDescription>
                                  {t('answer.description')}
                                </FormDescription>
                              </FormItem>
                            )
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </FormItem>
          )
        }}
      />
    )
  }, [form.control, intentsField, t, watchTrainType])

  return (
    <Form {...form}>
      <form className='space-y-3' id={id} onSubmit={handleSubmit}>
        <div className='flex gap-3'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => {
              return (
                <FormItem className='w-full'>
                  <FormLabel required>{t('intent_name.label')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('intent_name.placeholder')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name='referenceId'
            render={({ field }) => {
              return (
                <FormItem className='w-full'>
                  <FormLabel required>{t('referenceId.label')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('referenceId.placeholder')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </div>
        <FormField
          control={form.control}
          name='trainType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <FormLabel required>{t('training_type.label')}</FormLabel>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='capitalize'>
                    <SelectValue
                      placeholder={t('training_type.placeholder')}
                      className='capitalize'
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {['manual', 'automation'].map((item) => {
                    return (
                      <SelectItem
                        key={item}
                        value={item}
                        className='capitalize'
                      >
                        {item}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        {renderTrainManual()}
        {renderTrainAutomation()}
      </form>
    </Form>
  )
}

export default IntentForm
