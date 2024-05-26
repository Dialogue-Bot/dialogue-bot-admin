import { buttonVariants } from '@/components/ui'
import { ROUTES } from '@/constants'
import { CheckCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'

const CheckoutSuccess = () => {
  const { t } = useTranslation('checkout')

  useDocumentTitle(t('page_title'))

  return (
    <div className='min-h-screen pt-header flex items-center justify-center'>
      <div className='container py-10 md:py-20'>
        <div className='flex flex-col items-center gap-4 '>
          <CheckCircle className='w-20 h-20 text-green-500' />
          <h1 className='text-xl md:text-5xl font-bold text-center max-w-2xl mx-auto'>
            {t('title')}
          </h1>
          <Link className={buttonVariants({})} to={ROUTES.PUBLIC.LANDING_PAGE}>
            {t('btn_text')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccess
