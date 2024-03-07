/* eslint-disable react-refresh/only-export-components */
import { cn } from '@/lib/utils';
import { HtmlHTMLAttributes } from 'react';

type Props = HtmlHTMLAttributes<HTMLHeadingElement>;

export const H2 = ({ className, children, ...props }: Props) => {
   return (
      <h2
         className={cn(
            'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
            className
         )}
         {...props}
      >
         {children}
      </h2>
   );
};

export default H2;
