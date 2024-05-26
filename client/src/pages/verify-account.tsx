import { buttonVariants } from '@/components/ui'
import { ROUTES } from '@/constants'
import { BadgeCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'

const VerifyAccount = () => {
  const { t } = useTranslation(['verifyAccount', 'common'])

  useDocumentTitle(t('page_title'))

  return (
    <div className='w-full max-w-sm flex flex-col gap-3'>
      <div className='flex items-center justify-center text-green-500'>
        <BadgeCheck className='w-10 h-10' />
      </div>
      <div className='text-center'>
        <h2 className='text-xl font-semibold'>{t('title')}</h2>
        <p className='mt-1 text-muted-foreground'>{t('sub_title')}</p>
      </div>
      <Link className={buttonVariants()} to={ROUTES.AUTH.LOGIN}>
        {t('common:back_to_login')}
      </Link>
    </div>
  )
}

export default VerifyAccount
