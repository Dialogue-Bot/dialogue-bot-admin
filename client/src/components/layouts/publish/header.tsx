import { LogoText, buttonVariants } from '@/components/ui'
import { ROUTES } from '@/constants'
import { Bot } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Header = () => {
  const { t } = useTranslation('layout')

  return (
    <header className='h-header flex items-center fixed top-0 left-0 right-0 bg-background z-50'>
      <div className='container flex items-center justify-between'>
        <Link
          className='flex items-center gap-1'
          to={ROUTES.PUBLIC.LANDING_PAGE}
        >
          <Bot size={32} className='text-primary' />
          <LogoText className='text-primary text-xl' />
        </Link>

        <div>
          <Link
            to={ROUTES.PUBLIC.HELP}
            className={buttonVariants({
              variant: 'link',
            })}
          >
            {t('public_layout.help')}
          </Link>
          <Link to={ROUTES.AUTH.LOGIN} className={buttonVariants()}>
            {t('public_layout.start_now')}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
