import { CreateFlowBtn, FlowItem } from '@/components/pages/chatbots';
import { useSearchParams } from 'react-router-dom';
import { useDocumentTitle } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';
import { useSuspenseQuery } from '@tanstack/react-query';
import { urlSearchParamsToObject } from '@/utils';
import { queryFlowsOption } from '@/lib/query-options/flow';
import { TBaseQuery } from '@/types/share';
import { usePagination } from '@/hooks/use-pagination';
import { Button } from '@/components/ui';
import { useDidUpdate } from '@/hooks/use-did-update';

const LIMIT = 20;

const Chatbots = () => {
   const { t } = useTranslation('chatbots');
   const [search, setSearch] = useSearchParams();

   const { data } = useSuspenseQuery(
      queryFlowsOption(urlSearchParamsToObject(search) as TBaseQuery)
   );

   const { page, handleNextPage, handlePrevPage, disabledNext, disabledPrev } =
      usePagination({
         limit: LIMIT,
         initPage: 1,
         initTotalItems: data.totalItems || 0,
      });

   useDocumentTitle(t('page_title'));

   useDidUpdate(() => {
      setSearch((prev) => {
         prev.set('page', page.toString());
         prev.set('limit', `${LIMIT}`);
         return prev;
      });
   }, [page]);

   return (
      <div className="p-6">
         <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
               <CreateFlowBtn />
               {data.items.map((item) => {
                  return <FlowItem flow={item} />;
               })}
            </div>
            <div className="flex items-center justify-center gap-4 select-none">
               <Button
                  variant="outline"
                  onClick={handlePrevPage}
                  disabled={disabledPrev}
               >
                  Previous
               </Button>
               <Button
                  variant="outline"
                  onClick={handleNextPage}
                  disabled={disabledNext}
               >
                  Next
               </Button>
            </div>
         </div>
      </div>
   );
};

export default Chatbots;
