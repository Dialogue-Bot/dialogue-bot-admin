import { VariablesSettingForm } from '@/components/forms'
import { Button } from '@/components/ui'
import { useUpdateFlow } from '@/hooks/flow'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useFlowCtx } from './flow-provider'

type Props = {
  onClose: () => void
}

const VariablesSetting = ({ onClose }: Props) => {
  const { t } = useTranslation(['common'])
  const { id: flowId } = useParams()

  const { flow } = useFlowCtx()

  const updateFlowMutation = useUpdateFlow()

  return (
    <div className='flex flex-col gap-4 flex-1'>
      <VariablesSettingForm
        defaultValues={{
          ...flow,
        }}
        onSubmit={async (data) => {
          await updateFlowMutation.mutateAsync({
            data,
            id: flowId as string,
          })
        }}
      />
      <div className='flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-auto'>
        <Button variant='outline' onClick={onClose}>
          {t('common:cancel')}
        </Button>
        <Button
          form='variables-setting-form'
          type='submit'
          loading={updateFlowMutation.isPending}
        >
          {t('common:save')}
        </Button>
      </div>
    </div>
  )
}

export default VariablesSetting
