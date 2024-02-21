import type { Table } from '@tanstack/react-table';
import {
   ChevronLeftIcon,
   ChevronRightIcon,
   DoubleArrowLeftIcon,
   DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '../select';
import { Button } from '../button';
import { Confirm } from '../confirm';

interface DataTablePaginationProps<TData> {
   table: Table<TData>;
   onDelete?: (close?: () => void) => void;
   isLoadingDelete?: boolean;
}

export function DataTablePagination<TData>({
   table,
   onDelete,
   isLoadingDelete,
}: DataTablePaginationProps<TData>) {
   return (
      <div className="flex items-center justify-between px-2">
         <div className="flex items-center gap-2">
            <div className="flex-1 text-sm text-muted-foreground whitespace-nowrap">
               {table.getFilteredSelectedRowModel().rows.length} trên{' '}
               {table.getFilteredRowModel().rows.length} dòng được chọn.
            </div>
            {onDelete && table.getFilteredSelectedRowModel().rows.length ? (
               <Confirm
                  description="Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xoá?"
                  isLoading={isLoadingDelete}
                  onConfirm={onDelete}
                  title="Xoá những dòng đã chọn?"
               >
                  <span className=" text-sm text-red-500 cursor-pointer">
                     Xoá {table.getFilteredSelectedRowModel().rows.length} dòng
                  </span>
               </Confirm>
            ) : null}
         </div>
         <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
               <p className="text-sm font-medium">Dòng trên trang</p>
               <Select
                  onValueChange={(value) => {
                     table.setPageSize(Number(value));
                  }}
                  value={`${table.getState().pagination.pageSize}`}
               >
                  <SelectTrigger className="h-8 w-[70px]">
                     <SelectValue
                        placeholder={table.getState().pagination.pageSize}
                     />
                  </SelectTrigger>
                  <SelectContent side="top">
                     {[10, 20, 30, 40, 50].map((pageSize) => (
                        <SelectItem key={pageSize} value={`${pageSize}`}>
                           {pageSize}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium whitespace-nowrap">
               Trang {table.getState().pagination.pageIndex + 1} trên{' '}
               {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
               <Button
                  className="hidden h-8 w-8 p-0 lg:flex"
                  disabled={!table.getCanPreviousPage()}
                  onClick={() => {
                     table.setPageIndex(0);
                  }}
                  variant="outline"
               >
                  <span className="sr-only">Trang đầu</span>
                  <DoubleArrowLeftIcon className="h-4 w-4" />
               </Button>
               <Button
                  className="h-8 w-8 p-0"
                  disabled={!table.getCanPreviousPage()}
                  onClick={() => {
                     table.previousPage();
                  }}
                  variant="outline"
               >
                  <span className="sr-only">Trang trước</span>
                  <ChevronLeftIcon className="h-4 w-4" />
               </Button>
               <Button
                  className="h-8 w-8 p-0"
                  disabled={!table.getCanNextPage()}
                  onClick={() => {
                     table.nextPage();
                  }}
                  variant="outline"
               >
                  <span className="sr-only">Trang tiếp theo</span>
                  <ChevronRightIcon className="h-4 w-4" />
               </Button>
               <Button
                  className="hidden h-8 w-8 p-0 lg:flex"
                  disabled={!table.getCanNextPage()}
                  onClick={() => {
                     table.setPageIndex(table.getPageCount() - 1);
                  }}
                  variant="outline"
               >
                  <span className="sr-only">Trang cuối</span>
                  <DoubleArrowRightIcon className="h-4 w-4" />
               </Button>
            </div>
         </div>
      </div>
   );
}
