import { Article } from '@/components/pages/helps'
import { Article as TArticle } from '@/lib/content'
import { useTranslation } from 'react-i18next'
import { useLoaderData } from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'

const Help = () => {
  const data = useLoaderData() as {
    articles: TArticle[]
  }

  const { t } = useTranslation('help')

  useDocumentTitle(t('page_title'))

  return (
    <div className='min-h-screen pt-header'>
      <div className='container  py-10 md:py-20'>
        <div className='mb-10'>
          <h1 className='text-3xl md:text-5xl font-bold text-center max-w-2xl mx-auto'>
            {t('title')}
          </h1>
          <p className='text-center text-lg text-muted-foreground mt-4'>
            {t('desc')}
          </p>
        </div>
        <div>
          <div className='pl-4 border-l-2'>
            {data.articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help
