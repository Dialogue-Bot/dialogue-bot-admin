import {
   ArrowDownIcon,
   ArrowUpIcon,
   CaretSortIcon,
   EyeNoneIcon,
} from '@radix-ui/react-icons';
import type { Column } from '@tanstack/react-table';
import { useCallback } from 'react';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '../dropdown-menu';
import { Button } from '../button';
import { cn } from '@/lib/utils';

interface DataTableColumnHeaderProps<TData, TValue>
   extends React.HTMLAttributes<HTMLDivElement> {
   column: Column<TData, TValue>;
   title: string;
}

export function DataTableColumnHeader<TData, TValue>({
   column,
   title,
   className,
}: DataTableColumnHeaderProps<TData, TValue>) {
   const renderSortIcon = useCallback(() => {
      if (column.getIsSorted() === 'desc') {
         return <ArrowDownIcon className="ml-2 h-4 w-4" />;
      }
      if (column.getIsSorted() === 'asc') {
         return <ArrowUpIcon className="ml-2 h-4 w-4" />;
      }
      return <CaretSortIcon className="ml-2 h-4 w-4" />;
   }, [column]);

   if (!column.getCanSort()) {
      return (
         <div className={cn('text-sm whitespace-nowrap', className)}>
            {title}
         </div>
      );
   }

   return (
      <div className={cn('flex items-center space-x-2', className)}>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button
                  className="text-sm -ml-3 h-8 whitespace-nowrap data-[state=open]:bg-accent"
                  size="sm"
                  variant="ghost"
               >
                  <span>{title}</span>
                  {renderSortIcon()}
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
               <DropdownMenuItem
                  onClick={() => {
                     column.toggleSorting(false);
                  }}
               >
                  <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  Tăng dần
               </DropdownMenuItem>
               <DropdownMenuItem
                  onClick={() => {
                     column.toggleSorting(true);
                  }}
               >
                  <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  Giảm dần
               </DropdownMenuItem>
               <DropdownMenuSeparator />
               <DropdownMenuItem
                  onClick={() => {
                     column.toggleVisibility(false);
                  }}
               >
                  <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  Ẩn cột
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
}
