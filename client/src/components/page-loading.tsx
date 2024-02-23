import { Loader2 } from 'lucide-react';
import { LogoImg } from './ui';

const PageLoading = () => {
   return (
      <div className="flex items-center justify-center h-svh bg-white">
         <div className="flex flex-col gap-2 items-center">
            <LogoImg className="w-24 h-24" />
            <Loader2 className="text-primary animate-spin" size={24} />
         </div>
      </div>
   );
};

export default PageLoading;
