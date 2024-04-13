import { LogoText } from '@/components/ui'
import { Bot, FacebookIcon, GithubIcon, InstagramIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation('layout')
  return (
    <footer className='bg-blue-500 py-10 md:py-20 text-white'>
      <div className='container'>
        <div className='flex justify-between sm:flex-row flex-col sm:gap-[unset] gap-5'>
          <div className='space-y-4 max-w-96'>
            <div className='flex items-center gap-1'>
              <Bot size={32} className='text-white' />
              <LogoText className='text-white text-xl' />
            </div>
            <p className='font-medium'>{t('public_layout.footer_subtitle')}</p>
          </div>
          <div className='flex flex-col gap-3'>
            <span className='font-medium'>
              {t('public_layout.footer_built_by')}
            </span>
            <div className='flex items-center gap-3'>
              <GithubIcon />
              <FacebookIcon />
              <InstagramIcon />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
