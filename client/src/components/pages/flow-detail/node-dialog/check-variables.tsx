import {
  Input,
  Label,
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
import { useDidUpdate } from '@/hooks/use-did-update'
import _ from 'lodash'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebounceValue } from 'usehooks-ts'
import { useFlowCtx } from '..'

export const CheckVariablesContent = () => {
  const { flow, selectedNode, handleChangeSelectedNode } = useFlowCtx()
  const { t } = useTranslation(['flowDetail', 'forms'])
  const [variableInput, setVariableInput] = useState(
    selectedNode?.data?.variableInput || '',
  )
  const [error, setError] = useState('')

  const [debounce] = useDebounceValue(variableInput, 800)

  useDidUpdate(() => {
    if (!selectedNode) return
    const cloneSelectedNode = _.cloneDeep(selectedNode)
    const regex = /\{(?:\w+|\w+(?:->\w+)+)\}|\|\\\{(?:\w+|\w+(?:->\w+)+)\}\\\|/

    if (!regex.test(debounce)) {
      setError(t('forms:variable.errors.invalid'))
      return
    }

    setError('')

    const root = debounce.replace(/\{|\}/g, '').split('->')[0]

    if (!flow.variables.find((variable) => variable.name === root)) {
      setError(t('forms:variable.errors.not_found'))
      return
    }

    cloneSelectedNode.data.variableInput = debounce

    handleChangeSelectedNode(cloneSelectedNode)
  }, [debounce])

  return (
    <Tabs
      defaultValue='normal'
      value={selectedNode?.data?.variable_type || 'normal'}
      onValueChange={(value) => {
        if (!selectedNode) return

        const cloneSelectedNode = _.cloneDeep(selectedNode)

        cloneSelectedNode.data.variable_type = value

        if (value === 'normal') {
          delete cloneSelectedNode.data.variableInput
          setError('')
          setVariableInput('')
        } else {
          delete cloneSelectedNode.data.variable
        }

        handleChangeSelectedNode(cloneSelectedNode)
      }}
    >
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='normal'>Normal</TabsTrigger>
        <TabsTrigger value='input'>Input</TabsTrigger>
      </TabsList>
      <TabsContent value='normal'>
        <div className='space-y-2 w-full'>
          <Label>{t('forms:variable.label')}</Label>
          <Select
            value={selectedNode?.data?.variable}
            onValueChange={(value) => {
              if (!selectedNode) return

              const cloneSelectedNode = _.cloneDeep(selectedNode)

              cloneSelectedNode.data.variable = value

              handleChangeSelectedNode(cloneSelectedNode)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('forms:variable.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              {flow.variables?.map((variable, index) => {
                return (
                  <SelectItem
                    key={`${variable.name}-${index}`}
                    value={variable.name}
                  >
                    {variable.name}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
      </TabsContent>
      <TabsContent value='input'>
        <div className='space-y-2 w-full'>
          <Label help={t('forms:variable.description.check_variable')}>
            {t('forms:variable.label')}
          </Label>
          <Input
            value={variableInput}
            placeholder={t('forms:variable.placeholder_input')}
            onChange={(e) => setVariableInput(e.target.value)}
          />
          {error && (
            <p className='text-destructive text-[0.8rem] font-medium'>
              {error}
            </p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default CheckVariablesContent
