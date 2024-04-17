import { useErrorsLngChange } from '@/hooks/use-errors-lng-change'
import { TFlowInput, useFlowInputSchema } from '@/lib/schema/flow-input'
import {
  isStringArray,
  isStringBoolean,
  isStringNumber,
  isStringObject,
  toArray,
  toBoolean,
} from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import _, { toNumber } from 'lodash'
import { X } from 'lucide-react'
import { useCallback } from 'react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
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
  Textarea,
} from '../ui'

const closeChars = new Map([
  ['{', '}'],
  ['[', ']'],
  ['(', ')'],
])

type Props = {
  id?: string
  onSubmit?: (data: TFlowInput) => void
  defaultValues?: TFlowInput
}

const parseVariableValue = (value: string, type: string) => {
  if (isStringNumber(value) && type === 'number') return toNumber(value)
  if (isStringBoolean(value) && type === 'boolean') return toBoolean(value)

  if (isStringArray(value) && type === 'array') return toArray(value)

  if (isStringObject(value) && type === 'object') return JSON.parse(value)

  return value
}

const stringifyVariableValue = (value: any, type: string) => {
  if (type === 'array')
    return JSON.stringify(value)
      .replace('[', '')
      .replace(']', '')
      .replace(/"/g, '')

  if (type === 'object') return JSON.stringify(value, null, 2)

  if (type === 'string') return JSON.stringify(value).replace(/"/g, '')

  return JSON.stringify(value)
}

export const VariablesSettingForm = ({
  id = 'variables-setting-form',
  onSubmit,
  defaultValues,
}: Props) => {
  const { t } = useTranslation(['forms', 'common', 'flowDetail'])
  const schema = useFlowInputSchema()
  const form = useForm<TFlowInput>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      ...defaultValues,
      variables: defaultValues?.variables?.map((variable) => ({
        ...variable,
        value: stringifyVariableValue(variable.value, variable.type as string),
      })),
    },
  })

  const {
    fields: variables,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: 'variables',
  })

  useErrorsLngChange(form)

  const handleSubmit = (data: TFlowInput) => {
    if (onSubmit) {
      onSubmit({
        ...data,
        variables: data.variables?.map((variable) => ({
          ...variable,
          value: parseVariableValue(variable.value, variable.type as string),
        })),
      })
    }
  }

  const variablesWatch = useWatch({
    control: form.control,
    name: 'variables',
  })

  const handleAddVariable = useCallback(() => {
    form.trigger()

    if (
      !_.isEmpty(form.formState.errors.variables) ||
      variablesWatch?.some((field) => !field.name)
    )
      return

    append({ name: '', value: '', type: 'string' })
  }, [append, form, variablesWatch])

  const handleJsonChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    onChange: (value: any) => void,
  ) => {
    const cursorPosition = e.target.selectionStart

    const val = [...e.target.value]

    const char = val.slice(cursorPosition - 1, cursorPosition)[0]

    const closeChar = closeChars.get(char)

    if (closeChar) {
      val.splice(cursorPosition, 0, closeChar)
      e.target.value = val.join('')
      e.target.selectionEnd = cursorPosition
    }

    onChange(e.target.value)
  }

  const handleJsonKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    onChange: (value: any) => void,
  ) => {
    if (e.key === 'Tab') {
      e.preventDefault()

      const cursorPosition = e.currentTarget.selectionStart
      const value = e.currentTarget.value
      e.currentTarget.value =
        value.substring(0, cursorPosition) +
        '  ' +
        value.substring(cursorPosition, value.length)

      e.currentTarget.selectionStart = cursorPosition + 2
      e.currentTarget.selectionEnd = cursorPosition + 2

      onChange(e.currentTarget.value)
    }
  }

  const variablesError = form.formState.errors.variables

  return (
    <div className='space-y-3'>
      <div className='space-y-2 max-h-[25rem] overflow-y-auto pb-1 overflow-x-auto hidden-scroll pl-[2px]'>
        <Label>
          <span>{t('common:variables')}</span>
        </Label>
        {variablesError?.root?.message && (
          <div className='text-center p-1 rounded-md border border-destructive text-sm text-destructive bg-red-50'>
            {variablesError?.root?.message}
          </div>
        )}
        <Form {...form}>
          <form
            className='space-y-3 '
            id={id}
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            {variables.length > 0 ? (
              variables.map((variable, index) => {
                return (
                  <div key={variable.id} className='flex gap-3 w-full'>
                    <FormField
                      name={`variables.${index}.name`}
                      control={form.control}
                      render={({ field }) => {
                        return (
                          <FormItem className='w-full'>
                            <FormControl>
                              <Input
                                {...field}
                                autoComplete='off'
                                placeholder={t('variable_name.placeholder')}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )
                      }}
                    />
                    <FormField
                      name={`variables.${index}.value`}
                      control={form.control}
                      render={({ field }) => {
                        return (
                          <FormItem className='w-full'>
                            <FormControl>
                              {variablesWatch?.[index]?.type === 'object' ? (
                                <Textarea
                                  {...field}
                                  onChange={(e) => {
                                    handleJsonChange(e, field.onChange)
                                  }}
                                  onKeyDown={(e) =>
                                    handleJsonKeyDown(e, field.onChange)
                                  }
                                  autoComplete='off'
                                  placeholder={t('variable_value.placeholder')}
                                  className='hidden-scroll resize-none'
                                  rows={5}
                                />
                              ) : (
                                <Input
                                  {...field}
                                  autoComplete='off'
                                  placeholder={t('variable_value.placeholder')}
                                />
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )
                      }}
                    />
                    <FormField
                      name={`variables.${index}.type`}
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
                                  <SelectValue
                                    placeholder={t('variable_type.placeholder')}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {[
                                  'string',
                                  'number',
                                  'boolean',
                                  'array',
                                  'object',
                                ].map((type) => (
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
                      className='p-0 w-9 h-9 flex-shrink-0'
                      variant='destructive'
                      type='button'
                      onClick={() => remove(index)}
                    >
                      <X />
                    </Button>
                  </div>
                )
              })
            ) : (
              <span className='text-sm text-muted-foreground block text-center py-2'>
                {t('flowDetail:variables.empty_list')}
              </span>
            )}
          </form>
        </Form>
      </div>
      <Button onClick={handleAddVariable} className='w-full'>
        {t('flowDetail:variables.create_new')}
      </Button>
    </div>
  )
}

export default VariablesSettingForm
