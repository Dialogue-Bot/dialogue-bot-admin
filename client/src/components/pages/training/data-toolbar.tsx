import { buttonVariants } from '@/components/ui'
import { ROUTES } from '@/constants'
import { useSearch } from '@/hooks/use-search'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const DataToolbar = () => {
  const { renderInput } = useSearch()
  const { t } = useTranslation(['common', 'training'])

  return (
    <div className='flex items-center justify-between gap-3'>
      {renderInput({
        placeholder: t('common:search'),
      })}
      <Link
        to={ROUTES.PRIVATE.TRAINING.ADD_INTENT}
        className={buttonVariants({})}
      >
        {t('training:add_intent')}
      </Link>
    </div>
  )
}
