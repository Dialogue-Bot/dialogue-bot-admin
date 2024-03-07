import { cn } from '@/lib/utils';
import { HtmlHTMLAttributes } from 'react';

type TableProps = HtmlHTMLAttributes<HTMLTableElement>;
type THeadProps = HtmlHTMLAttributes<HTMLTableSectionElement>;
type TRowProps = HtmlHTMLAttributes<HTMLTableRowElement>;
type TCellProps = HtmlHTMLAttributes<HTMLTableCellElement>;

const Table = ({ className, children, ...props }: TableProps) => {
   return (
      <table className={cn('w-full', className)} {...props}>
         {children}
      </table>
   );
};

const Head = ({ className, children, ...props }: THeadProps) => {
   return (
      <thead className={cn(className)} {...props}>
         {children}
      </thead>
   );
};

const HeadCell = ({ className, children, ...props }: TCellProps) => {
   return (
      <th
         className={cn(
            'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
            className
         )}
         {...props}
      >
         {children}
      </th>
   );
};

const Row = ({ className, children, ...props }: TRowProps) => {
   return (
      <tr
         className={cn('m-0 border-t p-0 even:bg-muted', className)}
         {...props}
      >
         {children}
      </tr>
   );
};

const Cell = ({ className, children, ...props }: TCellProps) => {
   return (
      <td
         className={cn(
            'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
            className
         )}
         {...props}
      >
         {children}
      </td>
   );
};

export { Table, Head, HeadCell, Row, Cell };
