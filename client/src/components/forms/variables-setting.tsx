import { useErrorsLngChange } from '@/hooks/use-errors-lng-change'
import { TFlowInput, useFlowInputSchema } from '@/lib/schema/flow-input'
import { isStringBoolean, isStringNumber, toBoolean } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { toNumber } from 'lodash'
import { X } from 'lucide-react'
import { useCallback } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
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
} from '../ui'

type Props = {
  id?: string
  onSubmit?: (data: TFlowInput) => void
  defaultValues?: TFlowInput
}

const parseVariableValue = (value: string) => {
  if (isStringNumber(value)) return toNumber(value)
  if (isStringBoolean(value)) return toBoolean(value)
  return value
}

export const VariablesSettingForm = ({
  id = 'variables-setting-form',
  onSubmit,
  defaultValues,
}: Props) => {
  const { t } = useTranslation(['forms', 'common'])
  const schema = useFlowInputSchema()
  const form = useForm<TFlowInput>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      ...defaultValues,
    },
  })
  const {
    fields: variables,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
  } = useFieldArray({
    control: form.control,
    name: 'variables', // unique name for your Field Array
  })

  useErrorsLngChange(form)

  const handleSubmit = (data: TFlowInput) => {
    if (onSubmit) {
      onSubmit({
        ...data,
        variables: data.variables?.map((variable) => ({
          ...variable,
          value: parseVariableValue(variable.value),
        })),
      })
    }
  }

  const handleAddVariable = useCallback(() => {
    form.trigger()

    append({ name: '', value: '', type: 'string' })
  }, [append, form])

  return (
    <div className='space-y-3'>
      <div className='space-y-2 max-h-[25rem] overflow-y-auto pb-1 overflow-x-auto hidden-scroll pl-[2px]'>
        <Label>
          <span>{t('common:variables')}</span>
        </Label>
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
                              <Input
                                {...field}
                                autoComplete='off'
                                placeholder={t('variable_value.placeholder')}
                              />
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
                                {['string', 'number', 'boolean'].map((type) => (
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
                Not have any variable, click button below to add new variable.
              </span>
            )}
          </form>
        </Form>
      </div>
      <Button onClick={handleAddVariable} className='w-full'>
        Add new variable
      </Button>
    </div>
  )
}

export default VariablesSettingForm
