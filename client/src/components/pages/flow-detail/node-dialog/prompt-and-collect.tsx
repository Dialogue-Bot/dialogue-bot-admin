import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { EGrammarTypes } from '@/types/flow'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { MessageDialogContent } from '.'
import { useFlowCtx } from '..'
import { MAP_GRAMMAR_TYPE } from '../constant'

export const PromptAndCollectDialogContent = () => {
  const { t } = useTranslation('forms')
  const { flow, selectedNode, handleChangeSelectedNode } = useFlowCtx()

  return (
    <>
      <div className='space-y-3'>
        <div className='flex gap-3'>
          <div className='space-y-2 w-full'>
            <Label>{t('grammar_type.label')}</Label>
            <Select
              value={selectedNode?.data?.grammarType}
              onValueChange={(value) => {
                if (!selectedNode) return

                const cloneSelectedNode = _.cloneDeep(selectedNode)

                cloneSelectedNode.data.grammarType = value

                handleChangeSelectedNode(cloneSelectedNode)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('grammar_type.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {Object.values(EGrammarTypes).map((type) => {
                  return (
                    <SelectItem key={type} value={type}>
                      {MAP_GRAMMAR_TYPE[type]}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-2 w-full'>
            <Label>{t('assign_user_response.label')}</Label>
            <Select
              value={selectedNode?.data?.assignUserResponse}
              onValueChange={(value) => {
                if (!selectedNode) return

                const cloneSelectedNode = _.cloneDeep(selectedNode)

                cloneSelectedNode.data.assignUserResponse = value

                handleChangeSelectedNode(cloneSelectedNode)
              }}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={t('assign_user_response.placeholder')}
                />
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
        </div>
        <div className='flex gap-3'>
          <div className='space-y-2 w-full'>
            <Label>{t('trained_data.label')}</Label>
            <Select
              value={selectedNode?.data?.trainedData}
              onValueChange={(value) => {
                if (!selectedNode) return

                const cloneSelectedNode = _.cloneDeep(selectedNode)

                cloneSelectedNode.data.trainedData = value

                handleChangeSelectedNode(cloneSelectedNode)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('trained_data.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {Object.values(EGrammarTypes).map((type) => {
                  return (
                    <SelectItem key={type} value={type}>
                      {MAP_GRAMMAR_TYPE[type]}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-2 w-full'>
            <Label>{t('repeat.label')}</Label>
            <Select
              value={selectedNode?.data?.repeat?.toString()}
              onValueChange={(value) => {
                if (!selectedNode) return

                const cloneSelectedNode = _.cloneDeep(selectedNode)

                cloneSelectedNode.data.repeat = Number(value)

                handleChangeSelectedNode(cloneSelectedNode)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('repeat.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4, 5].map((value) => {
                  return (
                    <SelectItem key={value} value={value.toString()}>
                      {value}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        <MessageDialogContent />
      </div>
    </>
  )
}

export default PromptAndCollectDialogContent
