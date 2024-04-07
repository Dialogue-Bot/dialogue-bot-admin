import { CardForm } from '@/components/forms'
import {
  Button,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  Card as UCard,
} from '@/components/ui'
import { TCardInput } from '@/lib/schema/card-input'
import { DialogTitle } from '@radix-ui/react-dialog'
import _ from 'lodash'
import { Pencil, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFlowCtx } from '.'

type Props = {
  card: TCardInput
  index: number
}

const Card = ({ card, index }: Props) => {
  const [openCardDialog, setOpenCardDialog] = useState(false)
  const { selectedNode, currentLang, handleChangeSelectedNode } = useFlowCtx()
  const { t } = useTranslation(['flowDetail', 'common'])
  return (
    <UCard className='overflow-hidden min-h-60 flex flex-col max-w-72 w-full flex-shrink-0 relative flex-1 h-full'>
      <div className='flex items-center gap-3 absolute top-4 z-10 right-4'>
        <Dialog open={openCardDialog} onOpenChange={setOpenCardDialog}>
          <DialogTrigger asChild>
            <Button className='w-5 h-5 p-0' variant='outline'>
              <Pencil className='h-4 w-4' />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('card_dialog.title_update')}</DialogTitle>
              <DialogDescription>{t('card_dialog.desc')}</DialogDescription>
            </DialogHeader>
            <CardForm
              onSubmit={(data) => {
                if (!selectedNode) return

                const clonedNode = _.cloneDeep(selectedNode)

                clonedNode.data.contents[currentLang] = {
                  ...clonedNode.data.contents[currentLang],
                  cards: clonedNode.data.contents[currentLang]?.cards.map(
                    (_c: any, i: number) =>
                      i === index
                        ? {
                            ..._c,
                            ...data,
                          }
                        : _c,
                  ),
                }

                handleChangeSelectedNode(clonedNode)
                setOpenCardDialog(false)
              }}
              defaultValue={card}
            />
            <DialogFooter>
              <Button
                variant='outline'
                onClick={() => {
                  setOpenCardDialog(false)
                }}
              >
                {t('common:cancel')}
              </Button>
              <Button form='card-form'>{t('common:save')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button
          className='w-5 h-5 p-0 '
          variant='destructive'
          onClick={() => {
            if (!selectedNode) return

            const clonedNode = _.cloneDeep(selectedNode)

            clonedNode.data.contents[currentLang] = {
              ...clonedNode.data.contents[currentLang],
              cards: clonedNode.data.contents[currentLang]?.cards.filter(
                (_c: any, i: number) => i !== index,
              ),
            }

            handleChangeSelectedNode(clonedNode)
          }}
        >
          <X className='h-4 w-4' />
        </Button>
      </div>

      <CardContent className='p-0 flex-1 flex items-center bg-primary'>
        {card.imageUrl && (
          <img
            src={card.imageUrl}
            alt='Card Image'
            className='object-cover flex-1 h-full w-full'
          />
        )}
      </CardContent>
      <CardHeader className='p-4 mt-auto'>
        <CardTitle>{card.title}</CardTitle>
        <CardDescription>{card.subtitle}</CardDescription>
      </CardHeader>
    </UCard>
  )
}

export default Card
