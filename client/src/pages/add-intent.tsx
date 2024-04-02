import IntentForm from '@/components/forms/intent'
import PageDescription from '@/components/page-description'
import PageTitle from '@/components/page-title'
import { Button } from '@/components/ui'
import { useCreateIntent } from '@/hooks/intent'
import { useTranslation } from 'react-i18next'

const AddIntent = () => {
  const { t } = useTranslation('training')

  const createIntentMutation = useCreateIntent()

  return (
    <div className='p-6 space-y-4 max-w-3xl mx-auto'>
      <div>
        <PageTitle>{t('add_intent')}</PageTitle>
        <PageDescription>{t('add_intent_description')}</PageDescription>
      </div>
      <div className='space-y-3'>
        <IntentForm id='intent-form' onSubmit={createIntentMutation.mutate} />
        <div className='flex  items-center justify-end'>
          <Button
            form='intent-form'
            type='submit'
            loading={createIntentMutation.isPending}
          >
            {t('add_intent')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddIntent
