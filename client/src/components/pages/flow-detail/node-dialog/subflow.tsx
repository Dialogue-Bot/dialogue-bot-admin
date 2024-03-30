import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { queryFlowsForSelectOption } from '@/lib/query-options/flow'
import { useQuery } from '@tanstack/react-query'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useFlowCtx } from '..'

export const SubFlowContent = () => {
  const { id } = useParams()
  const { data: flows } = useQuery(queryFlowsForSelectOption())
  const { t } = useTranslation('forms')
  const { handleChangeSelectedNode, selectedNode } = useFlowCtx()

  return (
    <div className='space-y-2'>
      <Label>{t('sub_flow.label')}</Label>
      <Select
        value={selectedNode?.data?.subFlowId}
        onValueChange={(value) => {
          if (!selectedNode) return

          const cloneSelectedNode = _.cloneDeep(selectedNode)

          cloneSelectedNode.data.subFlowId = value

          handleChangeSelectedNode(cloneSelectedNode)
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={t('sub_flow.placeholder')} />
        </SelectTrigger>
        <SelectContent>
          {flows?.map((flow) => {
            if (flow.value === id) return null

            return (
              <SelectItem key={flow.value} value={flow.value}>
                {flow.label}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SubFlowContent
