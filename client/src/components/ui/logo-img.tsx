import logo from '@/assets/logo.png';
import { AspectRatio } from './aspect-ratio';
import { cn } from '@/lib/utils';

type Props = {
   className?: string;
};

export const LogoImg = ({ className }: Props) => {
   return (
      <div className={cn('h-8 w-8', className)}>
         <AspectRatio ratio={1}>
            <img src={logo} alt="logo" className="object-cover" />
         </AspectRatio>
      </div>
   );
};

export default LogoImg;
