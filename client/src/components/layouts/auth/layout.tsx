import banner from '@/assets/login-banner.png'
import ButtonLang from '@/components/btn-lang'
import { LogoText } from '@/components/ui'
import { Bot } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, Outlet } from 'react-router-dom'

export const Layout = () => {
  const { t } = useTranslation('layout')
  return (
    <div className='lg:grid grid-cols-2  flex items-center justify-center lg:items-stretch min-h-svh lg:pt-0 pt-header'>
      <div className='bg-primary p-4 relative lg:block hidden'>
        <Link className='flex items-center gap-1' to='/'>
          <Bot size={32} className='text-white' />
          <LogoText className='text-white text-xl' />
        </Link>
        <div className='p-8 text-white pt-12'>
          <span className='text-3xl font-semibold'>
            {t('auth_layout.title')}
          </span>
          <p className='mt-2'>{t('auth_layout.subtitle')}</p>
        </div>
        <img
          src={banner}
          alt='banner'
          className='absolute w-full left-0 bottom-0'
        />
      </div>
      <div className='p-4 flex flex-col w-full'>
        <div className='lg:static fixed top-0 left-0 right-0 lg:h-[unset] h-header flex items-center justify-between px-4 bg-background'>
          <Link className='flex items-center gap-1 lg:hidden ' to='/'>
            <Bot size={32} className='text-primary' />
            <LogoText className='text-primary text-xl' />
          </Link>
          <div className='flex items-center justify-end ml-auto'>
            <ButtonLang />
          </div>
        </div>
        <div className='flex-1 flex items-center justify-center w-full lg:h-[unset] '>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
