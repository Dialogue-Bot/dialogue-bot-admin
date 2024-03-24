import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { useFlowCtx } from '..'

export const CheckVariablesContent = () => {
  const { flow, selectedNode, handleChangeSelectedNode } = useFlowCtx()
  const { t } = useTranslation(['flowDetail', 'forms'])

  return (
    <div className='space-y-2'>
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
  )
}

export default CheckVariablesContent
