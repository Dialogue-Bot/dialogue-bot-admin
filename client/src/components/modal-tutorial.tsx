import botWelcome from '@/assets/message.png'
import { NEW_USER_STORED, ROUTES } from '@/constants'
import { getAllArticles } from '@/lib/content'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui'

export const ModalTutorial = () => {
  const [showTutorial, setShowTutorial] = useState(false)
  const { t } = useTranslation('common')

  useEffect(() => {
    const newUserStored = localStorage.getItem(NEW_USER_STORED)

    if (newUserStored) {
      setShowTutorial(true)

      localStorage.removeItem(NEW_USER_STORED)
    } else {
      setShowTutorial(false)
    }
  }, [])

  const { data } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      return getAllArticles({}).then((res) => res.slice(0, 5))
    },
  })

  return (
    <Dialog
      open={showTutorial}
      onOpenChange={setShowTutorial}
      aria-labelledby='tutorial-dialog'
    >
      <DialogContent>
        <img
          src={botWelcome}
          alt='bot-welcome'
          className='w-32 h-32 mx-auto mb-4'
        />
        <div className='text-center flex flex-col items-center gap-2'>
          <DialogTitle>{t('modal_tutorial.wellcome')}</DialogTitle>
          <DialogDescription>
            {t('modal_tutorial.welcome_desc')}
          </DialogDescription>
        </div>
        <ul className='flex flex-col list-decimal list-inside'>
          {data?.map((article) => {
            return (
              <li key={article.slug}>
                <Link
                  to={`${ROUTES.PUBLIC.HELP}/${article.slug}`}
                  className='font-medium hover:underline'
                >
                  {article.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
