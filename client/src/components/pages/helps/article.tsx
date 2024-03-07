import { ROUTES } from '@/constants';
import { Article as TArticle } from '@/lib/content';
import { getDateFnsLocale } from '@/lib/date-fns';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

type Props = {
   article: TArticle;
};

export const Article = ({ article }: Props) => {
   return (
      <article className="mb-8">
         <div className="grid grid-cols-4 ">
            <time className="text-muted-foreground md:inline-block hidden capitalize">
               {format(article.date, 'MMMM dd, yyyy', {
                  locale: getDateFnsLocale(),
               })}
            </time>
            <div className="md:col-span-3 col-span-4">
               <time className="text-muted-foreground md:hidden inline-block mb-1 capitalize">
                  {format(article.date, 'MMMM dd, yyyy', {
                     locale: getDateFnsLocale(),
                  })}
               </time>
               <Link to={`${ROUTES.PUBLIC.HELP}/${article.slug}`}>
                  <h3 className="font-semibold mb-1 hover:underline underline-offset-2">
                     {article.title}
                  </h3>
               </Link>
               <p className="text-sm text-muted-foreground line-clamp-3">
                  {article.description}
               </p>
            </div>
         </div>
      </article>
   );
};
