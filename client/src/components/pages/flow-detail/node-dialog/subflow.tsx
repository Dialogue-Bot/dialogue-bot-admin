import {
  Button,
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
import { X } from 'lucide-react'
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
      <div className='flex gap-3 flex-col'>
        <div className='flex gap-3 w-full'>
          <Label className='w-full'>{t('output_var.label')}</Label>
          <Label className='w-full'>{t('assign_var.label')}</Label>
        </div>
        {selectedNode?.data?.assignVars?.map((_item: any, index: number) => {
          return (
            <div key={index} className='flex gap-3'>
              <div className='space-y-2 w-full'>
                <Select
                  value={
                    selectedNode?.data?.assignVars[index]?.assignTo ||
                    NOT_CHOOSE
                  }
                  onValueChange={(value) => {
                    if (!selectedNode) return

                    const cloneSelectedNode = _.cloneDeep(selectedNode)

                    cloneSelectedNode.data.assignVars[index].assignTo =
                      value === NOT_CHOOSE ? undefined : value

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
                <Select
                  value={
                    selectedNode?.data?.assignVars[index]?.outputVar ||
                    NOT_CHOOSE
                  }
                  onValueChange={(value) => {
                    if (!selectedNode) return

                    const cloneSelectedNode = _.cloneDeep(selectedNode)

                    cloneSelectedNode.data.assignVars[index].outputVar =
                      value === NOT_CHOOSE ? undefined : value

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
              <Button
                variant='destructive'
                size='icon'
                className='flex-shrink-0'
                onClick={() => {
                  if (!selectedNode) return

                  const cloneSelectedNode = _.cloneDeep(selectedNode)

                  cloneSelectedNode.data.assignVars.splice(index, 1)

                  handleChangeSelectedNode(cloneSelectedNode)
                }}
              >
                <X />
              </Button>
            </div>
          )
        })}
        <Button
          variant='outline'
          onClick={() => {
            if (!selectedNode) return

            const cloneSelectedNode = _.cloneDeep(selectedNode)

            if (!cloneSelectedNode.data.assignVars) {
              cloneSelectedNode.data.assignVars = []
            }

            if (
              cloneSelectedNode.data.assignVars.length > 0 &&
              cloneSelectedNode.data.assignVars.some(
                (item: any) =>
                  item.assignTo === NOT_CHOOSE || item.outputVar === NOT_CHOOSE,
              )
            ) {
              return
            }

            cloneSelectedNode.data.assignVars.push({
              assignTo: undefined,
              outputVar: undefined,
            })

            handleChangeSelectedNode(cloneSelectedNode)
          }}
        >
          Add
        </Button>
      </div>
    </div>
  )
}

export default SubFlowContent
