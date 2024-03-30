import { CardForm } from '@/components/forms'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui'
import { EMessageTypes } from '@/types/flow'
import { DialogTitle } from '@radix-ui/react-dialog'
import _ from 'lodash'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFlowCtx } from '.'

const BtnAddCard = () => {
  const [openCardDialog, setOpenCardDialog] = useState(false)
  const { t } = useTranslation(['flowDetail', 'common'])
  const { selectedNode, handleChangeSelectedNode, currentLang } = useFlowCtx()
  return (
    <Dialog open={openCardDialog} onOpenChange={setOpenCardDialog}>
      <DialogTrigger asChild>
        <Button variant='outline' className='w-full max-w-72 h-auto min-h-60'>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('card_dialog.title_add')}</DialogTitle>
          <DialogDescription>{t('card_dialog.desc')}</DialogDescription>
        </DialogHeader>
        <CardForm
          onSubmit={(data) => {
            if (!selectedNode) return

            const clonedNode = _.cloneDeep(selectedNode)

            clonedNode.data.contents[currentLang] = {
              ...clonedNode.data.contents[currentLang],
              cards: [
                ...(clonedNode.data.contents[currentLang]?.cards || []),
                data,
              ],
              type: EMessageTypes.LIST_CARD,
            }

            handleChangeSelectedNode(clonedNode)
            setOpenCardDialog(false)
          }}
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
  )
}

export default BtnAddCard
