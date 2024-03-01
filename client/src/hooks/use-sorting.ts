import type { SortingState } from '@tanstack/react-table';
import { useCallback, useState } from 'react';
import { useDidUpdate } from './use-did-update';
import { useSearchParams } from 'react-router-dom';

export const useSorting = () => {
   const [_searchParams, setSearchParams] = useSearchParams();

   const [sorting, setSorting] = useState<SortingState>(
      _searchParams.get('orderBy')
         ? [
              {
                 id: _searchParams.get('orderBy') as string,
                 desc: _searchParams.get('sortType') === 'desc',
              },
           ]
         : []
   );

   const getSortObj = useCallback(() => {
      if (sorting.length === 0) {
         return {};
      }
      return {
         orderBy: sorting[0].id,
         sortType: sorting[0].desc ? 'desc' : 'asc',
      };
   }, [sorting]);

   useDidUpdate(() => {
      const sortObj = getSortObj();

      setSearchParams((prev) => {
         for (const [key, value] of Object.entries(sortObj)) {
            if (value) {
               prev.set(key, value);
            } else {
               prev.delete(key);
            }
         }

         return prev;
      });
   }, [getSortObj]);

   return {
      sorting,
      setSorting,
      getSortObj,
   };
};
