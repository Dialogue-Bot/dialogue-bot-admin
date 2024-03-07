import { Article as TArticle } from '@/lib/content';
import { useLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { H1 } from '@/components/typography';
import { Button, Input } from '@/components/ui';
import { Article } from '@/components/pages/helps';

const Help = () => {
   const data = useLoaderData() as {
      articles: TArticle[];
   };

   const { t } = useTranslation('help');

   return (
      <div className="container">
         <div className="py-16">
            <H1 className="text-center">{t('title')}</H1>
            <p className="text-center text-lg text-muted-foreground mt-4">
               {t('desc')}
            </p>
         </div>
         <div className="pl-4 border-l-2">
            {data.articles.map((article) => (
               <Article key={article.slug} article={article} />
            ))}
         </div>
      </div>
   );
};

export default Help;
