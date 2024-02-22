import { cn } from '@/lib/utils';

type Props = {
   className?: string;
};

export const LogoText = ({ className }: Props) => {
   return (
      <span className={cn('font-semibold inline-block text-lg', className)}>
         DialogueBot
      </span>
   );
};

export default LogoText;
