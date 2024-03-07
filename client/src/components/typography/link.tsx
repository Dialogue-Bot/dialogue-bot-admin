import { cn } from '@/lib/utils';
import { LinkProps, Link as RLink } from 'react-router-dom';

export const Link = ({ className, ...props }: LinkProps) => {
   return (
      <RLink className={cn('text-primary underline', className)} {...props}>
         Link
      </RLink>
   );
};

export default Link;
