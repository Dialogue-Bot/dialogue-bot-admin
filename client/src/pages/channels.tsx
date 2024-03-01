import { DataToolbar, useCols } from '@/components/pages/channels';
import { DataTable } from '@/components/ui';
import { useSearch } from '@/hooks/use-search';
import { queryChannelsOption } from '@/lib/query-options/channel';
import { TChannelQuery } from '@/types/channel';
import { urlSearchParamsToObject } from '@/utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

type Props = {};

export const Channels = (props: Props) => {
   const [search] = useSearchParams();

   const cols = useCols();

   const { data } = useSuspenseQuery(
      queryChannelsOption(urlSearchParamsToObject(search) as TChannelQuery)
   );

   return (
      <div className="px-6 py-4">
         <div>
            <DataTable
               columns={cols}
               data={data.items || []}
               renderToolbar={(table) => <DataToolbar />}
            />
         </div>
      </div>
   );
};

export default Channels;
