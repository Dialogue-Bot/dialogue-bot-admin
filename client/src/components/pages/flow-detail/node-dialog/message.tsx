import {
  Carousel,
  CarouselContent,
  CarouselItem,
  InputButtons,
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
  Textarea,
} from '@/components/ui'
import InputImage from '@/components/ui/input-image'
import { NOT_CHOOSE } from '@/constants'
import { useDidUpdate } from '@/hooks/use-did-update'
import { EMessageTypes } from '@/types/flow'
import _, { omit } from 'lodash'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebounceValue } from 'usehooks-ts'
import { useFlowCtx } from '..'
import BtnAddCard from '../btn-add-card'
import Card from '../card'
import { MAP_MESSAGE_TYPE } from '../constant'

export const MessageDialogContent = () => {
  const { selectedNode, handleChangeSelectedNode, currentLang, flow } =
    useFlowCtx()
  const { t } = useTranslation(['flowDetail', 'forms', 'common'])
  const [messageType, setMessageType] = useState<EMessageTypes>(
    selectedNode?.data.contents[currentLang]?.type || EMessageTypes.TEXT,
  )
  const [botResponse, setBotResponse] = useState(
    selectedNode?.data.contents[currentLang]?.message || '',
  )

  const [debounce] = useDebounceValue(botResponse, 800)

  const handleSelectChange = (value: EMessageTypes) => {
    setMessageType(value)

    if (!selectedNode) return

    const clonedNode = _.cloneDeep(selectedNode)
    const langs = Object.keys(clonedNode.data.contents || {})

    if (value !== EMessageTypes.TEXT) {
      langs.forEach((lang) => {
        clonedNode.data.contents[lang] = omit(clonedNode.data.contents[lang], [
          'message',
        ])
      })
    }

    if (value !== EMessageTypes.IMAGE) {
      langs.forEach((lang) => {
        clonedNode.data.contents[lang] = omit(clonedNode.data.contents[lang], [
          'url',
        ])
      })
    }

    if (value !== EMessageTypes.LIST_CARD) {
      langs.forEach((lang) => {
        clonedNode.data.contents[lang] = omit(clonedNode.data.contents[lang], [
          'cards',
          'buttons',
          'dynamicCards',
          'tab_type',
        ])
      })
    }

    clonedNode.data.contents[currentLang].type = value

    handleChangeSelectedNode(clonedNode)
  }

  useDidUpdate(() => {
    if (!selectedNode) return
    handleChangeSelectedNode({
      ...selectedNode,
      data: {
        ...selectedNode?.data,
        contents: {
          ...selectedNode?.data.contents,
          [currentLang]: {
            ...selectedNode?.data.contents[currentLang],
            message: debounce,
            type: EMessageTypes.TEXT,
          },
        },
      },
    })
  }, [debounce, currentLang])

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
      <div className='space-y-2'>
        <Label required help={t('forms:bot_response.description')}>
          {t('forms:bot_response.label')}
        </Label>
        {messageType === EMessageTypes.TEXT && (
          <Textarea
            placeholder={t('forms:bot_response.placeholder')}
            value={botResponse}
            onChange={(e) => {
              setBotResponse(e.target.value)
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
      {messageType !== EMessageTypes.LIST_CARD &&
        messageType !== EMessageTypes.IMAGE && (
          <InputButtons
            defaultValue={{
              buttons:
                selectedNode?.data?.contents?.[currentLang]?.buttons || [],
            }}
            onChange={({ buttons }) => {
              if (!selectedNode) return

              if (buttons.some((button) => button.label === '')) {
                return
              }

              const clonedNode = _.cloneDeep(selectedNode)

              clonedNode.data.contents[currentLang] = {
                ...clonedNode.data.contents[currentLang],
                buttons,
              }

              handleChangeSelectedNode(clonedNode)
            }}
          />
        )}
      {messageType === EMessageTypes.LIST_CARD && (
        <div>
          <Tabs
            value={
              selectedNode?.data?.contents?.[currentLang]?.tab_type || 'normal'
            }
            className='w-full'
            onValueChange={(value) => {
              const clonedNode = _.cloneDeep(selectedNode)

              delete clonedNode.data.contents[currentLang].cards
              delete clonedNode.data.contents[currentLang].buttons
              delete clonedNode.data.contents[currentLang].dynamicCards

              clonedNode.data.contents[currentLang].tab_type = value

              handleChangeSelectedNode(clonedNode)
            }}
          >
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='normal'>Normal</TabsTrigger>
              <TabsTrigger value='variable'>Use variable</TabsTrigger>
            </TabsList>
            <TabsContent value='normal'>
              <div className='flex gap-3'>
                {selectedNode?.data?.contents?.[currentLang]?.cards &&
                  selectedNode?.data?.contents?.[currentLang]?.cards.length >
                    0 && (
                    <Carousel className='max-w-72 w-full'>
                      <CarouselContent>
                        {(
                          selectedNode?.data?.contents?.[currentLang]?.cards ||
                          []
                        ).map((card: any, index: number) => {
                          return (
                            <CarouselItem key={index}>
                              <Card card={card} index={index} />
                            </CarouselItem>
                          )
                        })}
                      </CarouselContent>
                    </Carousel>
                  )}
                <BtnAddCard />
              </div>
            </TabsContent>
            <TabsContent value='variable'>
              <div className='space-y-2 w-full'>
                <Label required help={t('forms:variable.description.card')}>
                  {t('forms:variable.label')}
                </Label>

                <Select
                  value={
                    selectedNode?.data?.contents?.[currentLang]?.dynamicCards ||
                    NOT_CHOOSE
                  }
                  onValueChange={(value) => {
                    if (!selectedNode) return

                    const cloneSelectedNode = _.cloneDeep(selectedNode)

                    if (value === NOT_CHOOSE) {
                      delete cloneSelectedNode.data.contents[currentLang]
                        .dynamicCards
                    } else {
                      cloneSelectedNode.data.contents[
                        currentLang
                      ].dynamicCards = value
                    }

                    handleChangeSelectedNode(cloneSelectedNode)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t('forms:variable.placeholder')}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NOT_CHOOSE}>
                      {t('forms:variable.placeholder')}
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
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}

export default MessageDialogContent
