/* eslint-disable react-refresh/only-export-components */
import { cn } from '@/lib/utils';
import { HtmlHTMLAttributes } from 'react';

type Props = HtmlHTMLAttributes<HTMLHeadingElement>;

export const H3 = ({ className, children, ...props }: Props) => {
   return (
      <h3
         className={cn(
            'scroll-m-20 text-2xl font-semibold tracking-tight',
            className
         )}
         {...props}
      >
         {children}
      </h3>
   );
};

export default H3;
