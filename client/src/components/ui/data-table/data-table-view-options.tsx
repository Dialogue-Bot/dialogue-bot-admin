'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import type { Table } from '@tanstack/react-table';
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuSeparator,
} from '../dropdown-menu';
import { Button } from '../button';

interface DataTableViewOptionsProps<TData> {
   table: Table<TData>;
}

export function DataTableViewOptions<TData>({
   table,
}: DataTableViewOptionsProps<TData>) {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               className="ml-auto hidden h-8 lg:flex"
               size="sm"
               variant="outline"
            >
               <MixerHorizontalIcon className="mr-2 h-4 w-4" />
               Ẩn/hiện cột
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Cột</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
               .getAllColumns()
               .filter(
                  (column) =>
                     typeof column.accessorFn !== 'undefined' &&
                     column.getCanHide()
               )
               .map((column) => {
                  return (
                     <DropdownMenuCheckboxItem
                        checked={column.getIsVisible()}
                        className="capitalize"
                        key={column.id}
                        onCheckedChange={(value) => {
                           column.toggleVisibility(Boolean(value));
                        }}
                     >
                        {column.id}
                     </DropdownMenuCheckboxItem>
                  );
               })}
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
