import { PaginationState } from '@tanstack/react-table';
import { useSearchParams } from 'react-router-dom';
import { useDidUpdate } from './use-did-update';
import { useState } from 'react';

const LIMIT = 10;
const PAGE = 1;

export const usePaginate = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: searchParams.get('page')
         ? parseInt(searchParams.get('page') || '1') - 1
         : PAGE - 1,
      pageSize: searchParams.get('limit')
         ? parseInt(searchParams.get('limit') || '10')
         : LIMIT,
   });

   useDidUpdate(() => {
      setSearchParams((prev) => {
         prev.set('page', (pagination.pageIndex + 1).toString());
         prev.set('limit', pagination.pageSize.toString());
         return prev;
      });
   }, [pagination]);

   return {
      pagination,
      setPagination,
   };
};
