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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui'
import {
  TRequestOptions,
  useRequestOptionsSchema,
} from '@/lib/schema/request-options'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import _ from 'lodash'
import { X } from 'lucide-react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useFlowCtx } from '..'

export const HttpRequestDialogContent = () => {
  const { t } = useTranslation(['forms', 'common'])
  const { selectedNode, handleChangeSelectedNode } = useFlowCtx()
  const schema = useRequestOptionsSchema()
  const form = useForm<TRequestOptions>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      url: selectedNode?.data?.httpRequest?.url || '',
      method: selectedNode?.data?.httpRequest?.method || 'GET',
      params: selectedNode?.data?.httpRequest?.params || [],
      headers: selectedNode?.data?.httpRequest?.headers || [],
      query: selectedNode?.data?.httpRequest?.query || [],
      body: selectedNode?.data?.httpRequest?.body || [],
    },
  })

  const paramsFieldArray = useFieldArray({
    name: 'params',
    control: form.control,
  })

  const headersFieldArray = useFieldArray({
    name: 'headers',
    control: form.control,
  })

  const queryFieldArray = useFieldArray({
    name: 'query',
    control: form.control,
  })

  const bodyFieldArray = useFieldArray({
    name: 'body',
    control: form.control,
  })

  const formWatch = useWatch({
    control: form.control,
  })

  const handleAddKeyVal = (
    fieldArray: any,
    key: 'params' | 'headers' | 'query' | 'body',
  ) => {
    form.trigger(key)
    if (
      !_.isEmpty(form.formState.errors[key]) ||
      formWatch[key]?.some((field) => !field.key || !field.value)
    )
      return
    fieldArray.append({ key: '', value: '' })
  }

  const handleSubmit = (data: TRequestOptions) => {
    if (!selectedNode) return

    const clonedNode = _.cloneDeep(selectedNode)

    clonedNode.data.httpRequest = data

    handleChangeSelectedNode(clonedNode)
  }

  return (
    <Form {...form}>
      <form className='space-y-3' onSubmit={form.handleSubmit(handleSubmit)}>
        <div className='space-y-3'>
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{t('http_url.label')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t('http_url.placeholder')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='method'
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{t('http_method.label')}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue='GET'
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('http_method.placeholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {['GET', 'POST', 'PUT', 'DELETE'].map((method) => {
                      return (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <Tabs defaultValue='params'>
            <TabsList className='grid w-full grid-cols-4'>
              <TabsTrigger value='params'>Params</TabsTrigger>
              <TabsTrigger value='headers'>Headers</TabsTrigger>
              <TabsTrigger value='query'>Query</TabsTrigger>
              <TabsTrigger value='body'>Body</TabsTrigger>
            </TabsList>
            <TabsContent value='params'>
              <div className='space-y-3'>
                <div
                  className={cn(
                    'max-h-[128px] overflow-y-auto hidden-scroll px-[2px] space-y-3',
                    {
                      'py-1': paramsFieldArray.fields.length,
                    },
                  )}
                >
                  {paramsFieldArray.fields.map((field, index) => {
                    return (
                      <div key={field.id} className='flex gap-3'>
                        <FormField
                          control={form.control}
                          name={`params.${index}.key`}
                          render={({ field }) => {
                            return (
                              <FormItem className='w-full'>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder={t('key.placeholder')}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />
                        <FormField
                          control={form.control}
                          name={`params.${index}.value`}
                          render={({ field }) => {
                            return (
                              <FormItem className='w-full'>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder={t('value.placeholder')}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />
                        <Button
                          variant='destructive'
                          size='icon'
                          className='flex-shrink-0'
                          type='button'
                          onClick={() => {
                            paramsFieldArray.remove(index)
                          }}
                        >
                          <X />
                        </Button>
                      </div>
                    )
                  })}
                </div>
                <Button
                  type='button'
                  onClick={() => {
                    handleAddKeyVal(paramsFieldArray, 'params')
                  }}
                  variant='outline'
                  className='w-full'
                >
                  {t('common:add')}
                </Button>
              </div>
            </TabsContent>
            <TabsContent value='headers'>
              <div className='space-y-3'>
                <div
                  className={cn(
                    'max-h-[128px] overflow-y-auto hidden-scroll px-[2px] space-y-3',
                    {
                      'py-1': headersFieldArray.fields.length,
                    },
                  )}
                >
                  {headersFieldArray.fields.map((field, index) => {
                    return (
                      <div key={field.id} className='flex gap-3'>
                        <FormField
                          control={form.control}
                          name={`headers.${index}.key`}
                          render={({ field }) => {
                            return (
                              <FormItem className='w-full'>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder={t('key.placeholder')}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />
                        <FormField
                          control={form.control}
                          name={`headers.${index}.value`}
                          render={({ field }) => {
                            return (
                              <FormItem className='w-full'>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder={t('value.placeholder')}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />
                        <Button
                          variant='destructive'
                          size='icon'
                          className='flex-shrink-0'
                          type='button'
                          onClick={() => {
                            headersFieldArray.remove(index)
                          }}
                        >
                          <X />
                        </Button>
                      </div>
                    )
                  })}
                </div>

                <Button
                  type='button'
                  onClick={() => {
                    handleAddKeyVal(headersFieldArray, 'headers')
                  }}
                  className='w-full'
                  variant='outline'
                >
                  {t('common:add')}
                </Button>
              </div>
            </TabsContent>
            <TabsContent value='query'>
              <div className='space-y-3'>
                <div
                  className={cn(
                    'max-h-[128px] overflow-y-auto hidden-scroll px-[2px] space-y-3',
                    {
                      'py-1': queryFieldArray.fields.length,
                    },
                  )}
                >
                  {queryFieldArray.fields.map((field, index) => {
                    return (
                      <div key={field.id} className='flex gap-3'>
                        <FormField
                          control={form.control}
                          name={`query.${index}.key`}
                          render={({ field }) => {
                            return (
                              <FormItem className='w-full'>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder={t('key.placeholder')}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />
                        <FormField
                          control={form.control}
                          name={`query.${index}.value`}
                          render={({ field }) => {
                            return (
                              <FormItem className='w-full'>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder={t('value.placeholder')}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />
                        <Button
                          variant='destructive'
                          size='icon'
                          className='flex-shrink-0'
                          type='button'
                          onClick={() => {
                            queryFieldArray.remove(index)
                          }}
                        >
                          <X />
                        </Button>
                      </div>
                    )
                  })}
                </div>
                <Button
                  type='button'
                  onClick={() => {
                    handleAddKeyVal(queryFieldArray, 'query')
                  }}
                  variant='outline'
                  className='w-full'
                >
                  {t('common:add')}
                </Button>
              </div>
            </TabsContent>
            <TabsContent value='body'>
              <div className='space-y-3'>
                <div
                  className={cn(
                    'max-h-[128px] overflow-y-auto hidden-scroll px-[2px] space-y-3',
                    {
                      'py-1': bodyFieldArray.fields.length,
                    },
                  )}
                >
                  {bodyFieldArray.fields.map((field, index) => {
                    return (
                      <div key={field.id} className='flex gap-3'>
                        <FormField
                          control={form.control}
                          name={`body.${index}.key`}
                          render={({ field }) => {
                            return (
                              <FormItem className='w-full'>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder={t('key.placeholder')}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />
                        <FormField
                          control={form.control}
                          name={`body.${index}.value`}
                          render={({ field }) => {
                            return (
                              <FormItem className='w-full'>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder={t('value.placeholder')}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />
                        <Button
                          variant='destructive'
                          size='icon'
                          className='flex-shrink-0'
                          type='button'
                          onClick={() => {
                            bodyFieldArray.remove(index)
                          }}
                        >
                          <X />
                        </Button>
                      </div>
                    )
                  })}
                </div>

                <Button
                  type='button'
                  onClick={() => {
                    handleAddKeyVal(bodyFieldArray, 'body')
                  }}
                  variant='outline'
                  className='w-full'
                >
                  {t('common:add')}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          <div className='flex items-center justify-end'>
            <Button>{t('common:save')}</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default HttpRequestDialogContent
