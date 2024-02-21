'use client';

import * as React from 'react';
import type {
   ColumnDef,
   ColumnFiltersState,
   SortingState,
   TableOptions,
   VisibilityState,
   Table as RTable,
} from '@tanstack/react-table';
import {
   flexRender,
   getCoreRowModel,
   getFacetedRowModel,
   getFacetedUniqueValues,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from '@tanstack/react-table';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '../table';
import { DataTablePagination } from './data-table-pagination';

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[];
   data: TData[];
   opts?: Omit<TableOptions<TData>, 'data' | 'columns' | 'getCoreRowModel'>;
   renderToolbar?: (table: RTable<TData>) => React.ReactNode;
   onDeleteRowSelected?: (
      rows: Record<string, any>,
      close?: () => void
   ) => void;
   isLoadingDelete?: boolean;
}

export function DataTable<TData, TValue>({
   columns,
   data,
   opts,
   renderToolbar,
   onDeleteRowSelected,
   isLoadingDelete,
}: DataTableProps<TData, TValue>) {
   const [rowSelection, setRowSelection] = React.useState({});
   const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({});
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
   );
   const [sorting, setSorting] = React.useState<SortingState>([]);

   const { state, ..._opts } = opts || {};

   const table = useReactTable({
      data,
      columns,
      state: {
         sorting,
         columnVisibility,
         rowSelection,
         columnFilters,
         ...state,
      },
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
      getRowId(row: any, _, parent) {
         return parent ? [parent.id, row.id].join('.') : row.id;
      },
      ..._opts,
   });

   return (
      <>
         {renderToolbar ? renderToolbar(table) : null}
         <div className="rounded-md border">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                           return (
                              <TableHead
                                 colSpan={header.colSpan}
                                 key={header.id}
                              >
                                 {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                         header.column.columnDef.header,
                                         header.getContext()
                                      )}
                              </TableHead>
                           );
                        })}
                     </TableRow>
                  ))}
               </TableHeader>
               <TableBody>
                  {table.getRowModel().rows.length ? (
                     table.getRowModel().rows.map((row) => (
                        <TableRow
                           data-state={row.getIsSelected() && 'selected'}
                           key={row.id}
                        >
                           {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                 {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                 )}
                              </TableCell>
                           ))}
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell
                           className="h-24 text-center"
                           colSpan={columns.length}
                        >
                           Không có kết quả.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>
         <DataTablePagination
            isLoadingDelete={isLoadingDelete}
            onDelete={
               onDeleteRowSelected
                  ? (close) => {
                       onDeleteRowSelected(rowSelection, close);
                    }
                  : undefined
            }
            table={table}
         />
      </>
   );
}
