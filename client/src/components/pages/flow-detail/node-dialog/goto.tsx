import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { NOT_CHOOSE } from '@/constants'
import { EActionTypes } from '@/types/flow'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { useUnmount } from 'usehooks-ts'
import { MAP_ACTION } from '../constant'
import { useFlowCtx } from '../flow-provider'

export const GotoDialogContent = () => {
  const {
    selectedNode,
    handleChangeSelectedNode,
    nodes,
    handleDeleteNodeById,
  } = useFlowCtx()
  const { t } = useTranslation(['flowDetail', 'forms'])

  useUnmount(() => {
    if (!selectedNode) return

    if (
      !selectedNode.data?.gotoId ||
      selectedNode.data?.gotoId === NOT_CHOOSE
    ) {
      handleDeleteNodeById(selectedNode.id)
    }
  })

  return (
    <div className='space-y-2'>
      <Label required>{t('forms:action.label')}</Label>
      <Select
        value={selectedNode?.data?.gotoId}
        onValueChange={(value) => {
          if (!selectedNode) return

          const cloneSelectedNode = _.cloneDeep(selectedNode)

          cloneSelectedNode.data.gotoId = value

          handleChangeSelectedNode(cloneSelectedNode)
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={t('forms:action.placeholder')} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={NOT_CHOOSE}>
              {t('forms:action.placeholder')}
            </SelectItem>
            {nodes.map((node) => {
              if (
                node.id === selectedNode?.id ||
                node.data?.action === EActionTypes.START
              )
                return null
              return (
                <SelectItem
                  key={node.id}
                  value={node.id}
                  className='flex items-center'
                >
                  <div className='flex items-center gap-2'>
                    {MAP_ACTION[node.data?.action as EActionTypes].icon()}
                    {node.id} - {node.data?.name}
                  </div>
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
