import { calcPageCount } from '@/utils';
import { useState } from 'react';

export const usePagination = (opts: {
   limit: number;
   initPage: number;
   initTotalItems: number;
}) => {
   const { limit, initPage, initTotalItems } = opts;

   const [page, setPage] = useState(initPage);
   const totalPages = calcPageCount(initTotalItems, limit);

   const handleNextPage = () => {
      if (page >= totalPages) return;

      setPage((prev) => prev + 1);
   };

   const handlePrevPage = () => {
      if (page <= 1) return;

      setPage((prev) => prev - 1);
   };

   const disabledNext = page >= totalPages;
   const disabledPrev = page <= 1;

   return {
      disabledNext,
      disabledPrev,
      totalPages,
      page,
      handleNextPage,
      handlePrevPage,
   };
};
