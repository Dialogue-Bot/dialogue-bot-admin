import IntentForm from '@/components/forms/intent'
import PageDescription from '@/components/page-description'
import PageTitle from '@/components/page-title'
import { Button } from '@/components/ui'
import { useUpdateIntent } from '@/hooks/intent'
import { queryIntentOption } from '@/lib/query-options'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const UpdateIntent = () => {
  const { id } = useParams()
  const { t } = useTranslation('training')
  const { data } = useSuspenseQuery(queryIntentOption(id as string))

  const updateIntentMutation = useUpdateIntent()

  return (
    <div className='p-6 space-y-4 max-w-3xl mx-auto'>
      <div>
        <PageTitle>{t('update_intent_title')}</PageTitle>
        <PageDescription>{t('update_intent_description')}</PageDescription>
      </div>
      <div className='space-y-3'>
        <IntentForm
          id='intent-form'
          defaultValues={{
            name: data?.name,
            referenceId: data?.referenceId,
            trainType: 'manual',
            intents: data?.intents.map((intent) => ({
              intent: intent.intent,
              prompts: intent.prompts.map((prompt) => prompt.trim()).join(','),
              answers: intent.answers.map((answer) => answer.trim()).join(','),
            })),
            entities: [],
          }}
          onSubmit={(data) =>
            updateIntentMutation.mutate({ id: id as string, data })
          }
        />
        <div className='flex  items-center justify-end'>
          <Button form='intent-form' type='submit'>
            {t('update_intent')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UpdateIntent
