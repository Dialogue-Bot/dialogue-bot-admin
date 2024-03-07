/* eslint-disable react-refresh/only-export-components */
import { cn } from '@/lib/utils';
import { HtmlHTMLAttributes } from 'react';

type Props = HtmlHTMLAttributes<HTMLHeadingElement>;

export const H4 = ({ className, children, ...props }: Props) => {
   return (
      <h4
         className={cn(
            'scroll-m-20 text-xl font-semibold tracking-tight',
            className
         )}
         {...props}
      >
         {children}
      </h4>
   );
};

export default H4;
