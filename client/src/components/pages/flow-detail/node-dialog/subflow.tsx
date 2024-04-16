import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { NOT_CHOOSE } from '@/constants'
import {
  queryFlowOption,
  queryFlowsForSelectOption,
} from '@/lib/query-options/flow'
import { useQuery } from '@tanstack/react-query'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useFlowCtx } from '..'

export const SubFlowContent = () => {
  const { id } = useParams()
  const { data: flows } = useQuery(queryFlowsForSelectOption())
  const { t } = useTranslation('forms')
  const { handleChangeSelectedNode, selectedNode, flow } = useFlowCtx()
  const { data: subflow } = useQuery({
    ...queryFlowOption(selectedNode?.data?.subFlowId),
    enabled: !!selectedNode?.data?.subFlowId,
  })

  return (
    <div className='space-y-3'>
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
      <div className='flex gap-3'>
        <div className='space-y-2 w-full'>
          <Label>{t('assign_var.label')}</Label>
          <Select
            value={selectedNode?.data?.assignTo || NOT_CHOOSE}
            onValueChange={(value) => {
              if (!selectedNode) return

              const cloneSelectedNode = _.cloneDeep(selectedNode)

              if (value === NOT_CHOOSE) {
                delete cloneSelectedNode.data.assignTo
              } else {
                cloneSelectedNode.data.assignTo = value
              }

              handleChangeSelectedNode(cloneSelectedNode)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('assign_var.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={NOT_CHOOSE}>
                {t('assign_var.placeholder')}
              </SelectItem>
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
        <div className='space-y-2 w-full'>
          <Label>{t('output_var.label')}</Label>
          <Select
            value={selectedNode?.data?.outputVar || NOT_CHOOSE}
            onValueChange={(value) => {
              if (!selectedNode) return

              const cloneSelectedNode = _.cloneDeep(selectedNode)

              if (value === NOT_CHOOSE) {
                delete cloneSelectedNode.data.outputVar
              } else {
                cloneSelectedNode.data.outputVar = value
              }

              handleChangeSelectedNode(cloneSelectedNode)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('output_var.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={NOT_CHOOSE}>
                {t('output_var.placeholder')}
              </SelectItem>
              {subflow?.variables?.map((variable, index) => {
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
      </div>
    </div>
  )
}

export default SubFlowContent
