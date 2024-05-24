import { useTranslation } from 'react-i18next'
import { useDocumentTitle } from 'usehooks-ts'

const Conversations = () => {
  const { t } = useTranslation('conversations')

  useDocumentTitle(t('page_title'))

  return (
    <div className='flex items-center justify-center h-full'>
      <p className='text-muted-foreground text-center text-lg font-medium'>
        {t('select_conversation')}
      </p>
    </div>
  )
}

export default Conversations
