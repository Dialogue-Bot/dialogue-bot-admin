import {
  Input,
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
  const { flow, selectedNode, handleChangeSelectedNode, currentLang } =
    useFlowCtx()

  return (
    <>
      <div className='space-y-3'>
        <div className='grid-cols-4 grid gap-3'>
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
        {selectedNode?.data?.repeat > 0 && (
          <div className='space-y-2'>
            <Label required>{t('repeat_message.label')}</Label>
            <Input
              placeholder={t('repeat_message.placeholder')}
              value={
                selectedNode?.data?.contents?.[currentLang]?.repeatMessage || ''
              }
              onChange={(e) => {
                if (!selectedNode) return

                const clonedNode = _.cloneDeep(selectedNode)

                clonedNode.data.contents[currentLang] = {
                  ...clonedNode.data.contents[currentLang],
                  repeatMessage: e.target.value,
                }

                handleChangeSelectedNode(clonedNode)
              }}
            />
          </div>
        )}
        <MessageDialogContent />
      </div>
    </>
  )
}

export default PromptAndCollectDialogContent
