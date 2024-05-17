import botError from '@/assets/bot-error.png'
import { useTranslation } from 'react-i18next'

const Error = () => {
  const { t } = useTranslation('errorPage')
  return (
    <div className='min-h-svh flex items-center justify-center'>
      <div className='container flex flex-col gap-3'>
        <img src={botError} alt='error' className='mx-auto w-40 h-40' />
        <h1 className='text-2xl font-bold text-center'>{t('title')}</h1>
        <p className='text-center text-muted-foreground'>{t('message')}</p>
      </div>
    </div>
  )
}

export default Error
