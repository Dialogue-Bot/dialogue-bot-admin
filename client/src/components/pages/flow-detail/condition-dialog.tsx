import ConditionForm from '@/components/forms/condition'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui'
import { TCompareValue } from '@/lib/schema/compare-value'
import { useTranslation } from 'react-i18next'
import { useFlowCtx } from '.'

export const ConditionDialog = () => {
  const { t } = useTranslation(['flowDetail', 'common'])
  const {
    selectedEdge,
    getNode,
    handleChangeSelectedEdge,
    setNodes,
    handleDeleteEdgeById,
  } = useFlowCtx()

  const getOperatorValue = () => {
    if (!selectedEdge)
      return {
        operator: undefined,
        value: '',
      }

    const node = getNode(selectedEdge.source)

    if (!node?.data?.nextActions?.length)
      return {
        operator: undefined,
        value: '',
      }

    const nextAction = node.data.nextActions.find(
      (action: any) => action.id === selectedEdge.target,
    )

    if (!nextAction)
      return {
        operator: undefined,
        value: '',
      }

    return {
      operator: nextAction?.condition,
      value: nextAction?.value || '',
    }
  }

  const handleSave = (data: TCompareValue) => {
    if (!selectedEdge) return

    const node = getNode(selectedEdge.source)

    if (!node?.data?.nextActions?.length) return

    const nextAction = node.data.nextActions.find(
      (action: any) => action.id === selectedEdge.target,
    )

    if (!nextAction) return

    node.data.nextActions = node.data.nextActions.map((action: any) => {
      if (action.id === selectedEdge.target) {
        return {
          ...action,
          condition: data.operator,
          value: data.value,
        }
      }

      return action
    })

    setNodes((prev) => {
      return prev.map((n) => {
        if (n.id === node.id) {
          return node
        }

        return n
      })
    })

    handleChangeSelectedEdge(null)
  }

  const handleCancel = () => {
    if (!selectedEdge) return

    const node = getNode(selectedEdge.source)

    if (!node) return

    if (!node.data?.nextActions?.length) return

    const nextAction = node.data?.nextActions.find(
      (action: any) => action.id === selectedEdge.target,
    )

    if (!nextAction) return

    if (!nextAction.condition) {
      handleDeleteEdgeById(selectedEdge.id)
    }

    handleChangeSelectedEdge(null)
  }

  return (
    <Dialog
      open={Boolean(selectedEdge)}
      onOpenChange={(open) => {
        if (!open) {
          handleCancel()
        }
      }}
    >
      <DialogTrigger asChild>
        <div className='hidden' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('condition_dialog.title')}</DialogTitle>
          <DialogDescription>{t('condition_dialog.desc')}</DialogDescription>
        </DialogHeader>
        <ConditionForm
          defaultValues={{
            ...getOperatorValue(),
          }}
          onSubmit={handleSave}
        />
        <DialogFooter>
          <Button type='submit' form='condition-form'>
            {t('common:save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConditionDialog
