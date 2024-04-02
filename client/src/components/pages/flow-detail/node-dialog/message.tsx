import {
  Carousel,
  CarouselContent,
  CarouselItem,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import InputImage from '@/components/ui/input-image'
import { EMessageTypes } from '@/types/flow'
import _, { omit } from 'lodash'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFlowCtx } from '..'
import BtnAddCard from '../btn-add-card'
import Card from '../card'
import { MAP_MESSAGE_TYPE } from '../constant'
import InputButtons from '../input-buttons'

export const MessageDialogContent = () => {
  const { selectedNode, handleChangeSelectedNode, currentLang } = useFlowCtx()
  const { t } = useTranslation(['flowDetail', 'forms', 'common'])
  const [messageType, setMessageType] = useState<EMessageTypes>(
    selectedNode?.data.contents[currentLang]?.type || EMessageTypes.TEXT,
  )

  const handleSelectChange = (value: EMessageTypes) => {
    setMessageType(value)

    if (!selectedNode) return

    const clonedNode = _.cloneDeep(selectedNode)
    const langs = Object.keys(clonedNode.data.contents || {})

    if (value !== EMessageTypes.TEXT) {
      langs.forEach((lang) => {
        clonedNode.data.contents[lang] = omit(clonedNode.data.contents[lang], [
          'message',
          'type',
        ])
      })
    }

    if (value !== EMessageTypes.IMAGE) {
      langs.forEach((lang) => {
        clonedNode.data.contents[lang] = omit(clonedNode.data.contents[lang], [
          'url',
          'type',
        ])
      })
    }

    if (value !== EMessageTypes.LIST_BUTTON) {
      langs.forEach((lang) => {
        clonedNode.data.contents[lang] = omit(clonedNode.data.contents[lang], [
          'buttons',
          'type',
        ])
      })
    }

    if (value !== EMessageTypes.LIST_CARD) {
      langs.forEach((lang) => {
        clonedNode.data.contents[lang] = omit(clonedNode.data.contents[lang], [
          'cards',
          'type',
        ])
      })
    }

    handleChangeSelectedNode(clonedNode)
  }

  if (!selectedNode) return null

  return (
    <div className='space-y-3'>
      <div className='space-y-2'>
        <Label required>{t('message_dialog.responses')}</Label>
        <Select value={messageType} onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder='Select a fruit' />
          </SelectTrigger>
          <SelectContent>
            {Object.values(EMessageTypes).map((type) => {
              return (
                <SelectItem key={type} value={type}>
                  {MAP_MESSAGE_TYPE[type].label}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>
      {messageType !== EMessageTypes.LIST_BUTTON && (
        <div className='space-y-2'>
          <Label required>{t('message_dialog.forms.bot_response.label')}</Label>
          {messageType === EMessageTypes.TEXT && (
            <Input
              placeholder={t('message_dialog.forms.bot_response.placeholder')}
              value={selectedNode?.data?.contents?.[currentLang]?.message || ''}
              onChange={(e) => {
                if (!selectedNode) return

                const clonedNode = _.cloneDeep(selectedNode)

                clonedNode.data.contents[currentLang] = {
                  ...clonedNode.data.contents[currentLang],
                  message: e.target.value,
                  type: EMessageTypes.TEXT,
                }

                handleChangeSelectedNode(clonedNode)
              }}
            />
          )}
          {messageType === EMessageTypes.IMAGE && (
            <InputImage
              value={selectedNode?.data?.contents?.[currentLang]?.url || ''}
              onChange={(url) => {
                if (!selectedNode) return

                const clonedNode = _.cloneDeep(selectedNode)

                clonedNode.data.contents[currentLang] = {
                  ...clonedNode.data.contents[currentLang],
                  url,
                  type: EMessageTypes.IMAGE,
                }

                handleChangeSelectedNode(clonedNode)
              }}
              toServer
              size={120}
            />
          )}
        </div>
      )}
      {messageType === EMessageTypes.LIST_BUTTON && (
        <InputButtons
          onChange={({ buttons }) => {
            if (!selectedNode) return

            const clonedNode = _.cloneDeep(selectedNode)

            clonedNode.data.contents[currentLang] = {
              ...clonedNode.data.contents[currentLang],
              buttons,
              type: EMessageTypes.LIST_BUTTON,
            }

            handleChangeSelectedNode(clonedNode)
          }}
          defaultValue={{
            buttons: selectedNode?.data?.contents?.[currentLang]?.buttons,
          }}
        />
      )}
      {messageType === EMessageTypes.LIST_CARD && (
        <div className='flex gap-3'>
          {selectedNode?.data?.contents?.[currentLang]?.cards && (
            <Carousel className='max-w-72 w-full'>
              <CarouselContent>
                {(selectedNode?.data?.contents?.[currentLang]?.cards || []).map(
                  (card: any, index: number) => {
                    return (
                      <CarouselItem key={index}>
                        <Card card={card} />
                      </CarouselItem>
                    )
                  },
                )}
              </CarouselContent>
            </Carousel>
          )}
          <BtnAddCard />
        </div>
      )}
    </div>
  )
}

export default MessageDialogContent
