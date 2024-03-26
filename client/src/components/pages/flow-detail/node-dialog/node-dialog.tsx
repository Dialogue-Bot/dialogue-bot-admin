import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { LANGS } from '@/constants'
import { useDidUpdate } from '@/hooks/use-did-update'
import { EActionTypes } from '@/types/flow'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebounceValue } from 'usehooks-ts'
import { useFlowCtx } from '..'
import { MAP_ACTION } from '../constant'

export const NodeDialog = () => {
  const { t } = useTranslation(['flowDetail', 'forms'])
  const {
    selectedNode,
    handleChangeSelectedNode,
    currentLang,
    handleChangeLang,
  } = useFlowCtx()
  const [name, setName] = useState('')

  const [debounce] = useDebounceValue(name, 800)

  useDidUpdate(() => {
    if (!selectedNode) return
    handleChangeSelectedNode({
      ...selectedNode,
      data: {
        ...selectedNode?.data,
        name: debounce,
      },
    })
  }, [debounce])

  useEffect(() => {
    if (selectedNode) {
      setName(selectedNode.data.name || '')
    }
  }, [selectedNode])

  if (!selectedNode) return null

  return (
    <Dialog
      open={Boolean(selectedNode)}
      onOpenChange={(open) => {
        if (!open) {
          handleChangeSelectedNode(null)
        }

        setName(selectedNode?.data.name || '')
      }}
    >
      <DialogTrigger asChild>
        <div className='!hidden'></div>
      </DialogTrigger>
      <DialogContent className='max-w-xl'>
        <DialogHeader>
          <DialogTitle>{selectedNode?.data.label}</DialogTitle>
          <DialogDescription>{t('node_dialog.desc')}</DialogDescription>
        </DialogHeader>
        <div className='space-y-3'>
          <div className='space-y-2'>
            <Label>{t('forms:name.label')}</Label>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
              placeholder={t('forms:name.placeholder')}
            />
          </div>
          {selectedNode.data.action !== EActionTypes.CHECK_VARIABLES &&
            selectedNode.data.action !== EActionTypes.HTTP_REQUEST &&
            selectedNode.data.action !== EActionTypes.SUB_FLOW && (
              <div className='space-y-2'>
                <Label>{t('forms:bot_lang.label')}</Label>
                <Select
                  onValueChange={(value) => {
                    handleChangeLang(value)
                  }}
                  value={currentLang}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t('forms:bot_lang.placeholder')}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(LANGS).map((lang) => {
                      return (
                        <SelectItem key={lang} value={lang}>
                          {LANGS[lang]}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            )}
          {selectedNode &&
            MAP_ACTION[
              selectedNode.data.action as unknown as EActionTypes
            ].dialogContent()}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NodeDialog
