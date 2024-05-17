import { buttonVariants } from '@/components/ui'
import { ROUTES } from '@/constants'
import { useSearch } from '@/hooks/use-search'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const DataToolbar = () => {
  const { renderInput } = useSearch()
  const { t } = useTranslation(['common', 'training'])

  return (
    <div className='flex items-center justify-between gap-3 sm:flex-row flex-col'>
      {renderInput({
        placeholder: t('common:search'),
        className: 'w-full max-w-full sm:max-w-64',
      })}
      <Link
        to={ROUTES.PRIVATE.TRAINING.ADD_INTENT}
        className={buttonVariants({
          className: 'w-full sm:w-auto',
        })}
      >
        {t('training:add_intent')}
      </Link>
    </div>
  )
}
